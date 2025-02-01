from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from pymongo import MongoClient
import pika
import json
import os
from dotenv import load_dotenv  # Import dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB to RabbitMQ function
def load_request_from_mongo(**kwargs):
    try:
        project_id = kwargs['dag_run'].conf.get('projectId')  # Fetch projectId from conf

        mongo_uri = os.getenv('MONGODB_URI')  # Load from .env
        if not mongo_uri:
            raise ValueError("MONGODB_URI is not set!")

        mongo_client = MongoClient(mongo_uri)
        db = mongo_client['test']
        collection = db['resources']

        mongo_client.admin.command('ping')
        print("MongoDB connection successful")

        # Fetch requests specific to projectId
        requests = collection.find({"projectid": project_id})
        list_of_requests = list(requests)
        print(f"Found {len(list_of_requests)} requests for project {project_id}")

        return list_of_requests

    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return []

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
    schedule_interval='@daily',
    catchup=False,
) as dag:

    load_requests = PythonOperator(
        task_id='load_requests',
        python_callable=load_request_from_mongo,
        provide_context=True,
    )
