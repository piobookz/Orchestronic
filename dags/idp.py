from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from pymongo import MongoClient
import pika
import json
import subprocess
import os

#TODO - Fetch the project id from the front end
#TODO - Add the project id to the query in the load_request_from_mongo function

# MongoDB to RabbitMQ function
def load_request_from_mongo(**kwargs):
    try:
        project_id = kwargs['dag_run'].conf.get('projectId')  # Fetch projectId from conf

        mongo_client = MongoClient(os.environ['MONGODB_URI'])
        db = mongo_client['test']  # database name
        collection = db['requests']  # collection name

        mongo_client.admin.command('ping')
        print("MongoDB connection successful")

        # Fetch requests specific to projectId
        requests = collection.find({"projectid": project_id})  # Filter by projectId
        print(f"Found {requests.count()} requests for project {project_id}")
        list_of_requests = list(requests)
        return list_of_requests

    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return []

def load_request_to_rabbitmq(list_of_requests):
    try:
        # RabbitMQ connection
        rabbitmq_connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', port=5672))  # Replace with your RabbitMQ host
        channel = rabbitmq_connection.channel()
        queue = 'requests_queue'
        channel.queue_declare(queue=queue, durable=True)  # Ensure that the queue is durable

        # Loop through each request and publish it to RabbitMQ
        for request in list_of_requests:
            message = json.dumps(request, default=str)  # Convert request to JSON string

            # consume the message from RabbitMQ
            channel.basic_publish(
                exchange='',
                routing_key=queue,
                body=message,
                properties=pika.BasicProperties(
                    delivery_mode=2,  # Make the message persistent
                )
            )
            print(f"Published request {request['requestid']} to RabbitMQ")

        # Close RabbitMQ connection
        rabbitmq_connection.close()

    except Exception as e:
        print(f"RabbitMQ connection failed: {e}")

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
    schedule_interval='@daily',  # Adjust this to your schedule
    catchup=False,
) as dag:

    # Step 1: Load requests from MongoDB
    load_requests = PythonOperator(
        task_id='load_requests',
        python_callable=load_request_from_mongo,
        provide_context=True,  # Allows kwargs to be passed
    )

    # Step 2: Load requests to RabbitMQ
    load_to_rabbitmq = PythonOperator(
        task_id='load_to_rabbitmq',
        python_callable=load_request_to_rabbitmq,
        op_kwargs={"list_of_requests": "{{ task_instance.xcom_pull(task_ids='load_requests') }}"},
        trigger_rule='all_success'  # Ensure it runs after the previous task
    )

    load_requests >> load_to_rabbitmq
