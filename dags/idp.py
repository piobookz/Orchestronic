from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from airflow.providers.mongo.hooks.mongo import MongoHook
import pymongo
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson.json_util import dumps

def fetch_from_mongo(**kwargs):
    try:
        load_dotenv('/opt/airflow/dags/.env')
        uri = os.getenv("MONGODB_URI")
        # print("MONGODB_URI:", uri)
        if not uri:
            raise Exception("MONGODB_URI is not set")

        # print("Connecting to MongoDB at:", uri)

        client = MongoClient(uri)
        database = client["test"]
        collection = database["resources"]

        dag_run = kwargs.get('dag_run')
        if dag_run and dag_run.conf:
            project_id = dag_run.conf.get('projectId')
            # print("Fetched projectId:", project_id)
        else:
            print("No projectId provided in DAG run config.")
            return "[]"  # Return empty list if no project ID

        # Fetch data from MongoDB
        data = list(collection.find({"projectid": project_id}))  # Convert cursor to list
        print("Fetched data:", data)

    except Exception as e:
        raise Exception(f"The following error occurred: {str(e)}")
    
    finally:
        client.close()  # Close client only after fetching data

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
    dag_id='idp_fetch_mongo',
    default_args=default_args,
    schedule='@daily',  # Updated for Airflow 2+
    catchup=False,
) as dag:

    fetch_requests = PythonOperator(
        task_id='fetch_from_mongo',
        python_callable=fetch_from_mongo,
    )
