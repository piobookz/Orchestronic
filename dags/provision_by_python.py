from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from pymongo import MongoClient
import pika
import json
import os

# MongoDB to RabbitMQ function
def load_mongo_to_rabbitmq(**context):
    # MongoDB connection
    try:
        mongo_client = MongoClient(os.environ['MONGODB_URI'])  # Replace with your MongoDB URI
        db = mongo_client['test']  # Replace with your database name
        collection = db['requests']  # Replace with your collection name

        # Check MongoDB connection
        mongo_client.admin.command('ping')  # This is the ping command to check connection
        print("MongoDB connection successful")
    
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return

    # RabbitMQ connection
    rabbitmq_connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', port=5672))  # Replace with your RabbitMQ host
    channel = rabbitmq_connection.channel()
    queue = 'requests'
    channel.queue_declare(queue, durable=True)

    # Fetch data from MongoDB
    documents = collection.find()
    for doc in documents:
        # Convert MongoDB document to JSON string
        message = json.dumps(doc, default=str)  # Use default=str to handle non-serializable data types

        # Publish the message to RabbitMQ
        channel.basic_publish(
            exchange='',
            routing_key=queue,
            body=message,
            properties=pika.BasicProperties(
                delivery_mode=2,  # Make the message persistent
            )
        )

    # Close the connections
    rabbitmq_connection.close()
    mongo_client.close()

# Default args for DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2025, 1, 19),
    'retries': 1,
}

# Define DAG
with DAG(
    dag_id='mongo_to_rabbitmq',
    default_args=default_args,
    schedule_interval='@daily',  # Replace with your desired schedule
    catchup=False,
) as dag:

    # Task to load data
    transfer_data = PythonOperator(
        task_id='transfer_data',
        python_callable=load_mongo_to_rabbitmq,
        provide_context=True,
    )

    transfer_data
