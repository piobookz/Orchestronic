from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson.json_util import dumps
import pika
from urllib.parse import urlparse

# Global Variables
listener_initialized = False
received_message = None

def rabbitmq_consumer():
    global listener_initialized, received_message

    # Load environment variables
    load_dotenv('/opt/airflow/dags/.env')

    if listener_initialized:
        print("Listener is already running.")
        return

    connection = None
    channel = None

    try:
        listener_initialized = True
        rabbit_url = os.getenv("RABBITMQ_URL")
        
        if not rabbit_url:
            raise Exception("RABBITMQ_URL is not set")
        
        parsed_url = urlparse(rabbit_url)
        rabbit_host = parsed_url.hostname
        rabbit_port = parsed_url.port
        
        if not rabbit_host:
            raise Exception("RabbitMQ hostname could not be resolved")
        
        credentials = None
        if parsed_url.username and parsed_url.password:
            credentials = pika.PlainCredentials(parsed_url.username, parsed_url.password)

        parameters = pika.ConnectionParameters(
            host=rabbit_host,
            port=rabbit_port,
            credentials=credentials
        )
        
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()

        queue_name = "create-vm"
        # Get queue info
        queue_info = channel.queue_declare(queue=queue_name, durable=True, exclusive=False, auto_delete=False)
        message_count = queue_info.method.message_count
        print(f"Queue {queue_name} has {message_count} messages")

        def callback(ch, method, properties, body):
            try:
                global received_message
                received_message = body.decode()
                print(f" [x] Received {received_message}")
                
                # Acknowledge the message
                ch.basic_ack(delivery_tag=method.delivery_tag)

                # Stop consuming after receiving the message
                ch.stop_consuming()
                
            except Exception as e:
                print(f"Error processing message: {e}")

        # Configure consumer
        channel.basic_consume(
            queue=queue_name,
            on_message_callback=callback,
            auto_ack=False 
        )

        print(f"Listening for messages in queue: {queue_name}")
        
        # Start consuming with a timeout
        try:
            channel.start_consuming()
        except KeyboardInterrupt:
            channel.stop_consuming()

        channel.queue_delete(queue=queue_name)
    except Exception as error:
        print("Error in listener:", error)
        raise

    finally:
        listener_initialized = False
        if channel and not channel.is_closed:
            channel.close()
        if connection and not connection.is_closed:
            connection.close()
        print("Listener stopped.")
        
        return received_message if received_message is not None else ""

def fetch_from_mongo(received_message):
    print(f"Received message from XCom: {received_message}")
    project_id = received_message
        
    try:
        load_dotenv('/opt/airflow/dags/.env')
        uri = os.getenv("MONGODB_URI")
        if not uri:
            raise Exception("MONGODB_URI is not set")

        client = MongoClient(uri)
        database = client["test"]
        collection = database["resources"]

        data = list(collection.find({"projectid": project_id}))
        print("Fetched data:", data)

    except Exception as e:
        raise Exception(f"The following error occurred: {str(e)}")
    
    finally:
        client.close()

    return dumps(data)

# Default args for DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2025, 1, 19),
    'retries': 1,
}

# Define DAG
with DAG(
    dag_id='idp',
    default_args=default_args,
    schedule='@daily',
    catchup=False,
) as dag:

    consume_rabbitmq = PythonOperator(
        task_id='rabbitmq_consumer',
        python_callable=rabbitmq_consumer,
        provide_context=True,
    )

    fetch_requests = PythonOperator(
    task_id='fetch_from_mongo',
    python_callable=fetch_from_mongo,
    op_args=["{{ ti.xcom_pull(task_ids='rabbitmq_consumer') | trim | replace('\"', '') }}"],  # Remove extra quotes
    provide_context=True,
)


consume_rabbitmq >> fetch_requests