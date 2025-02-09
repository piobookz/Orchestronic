from airflow import DAG
from airflow.operators.python import PythonOperator
# from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta
import pymongo
import pika
import os
# import subprocess

# MongoDB connection
def get_mongodb_request(request_id):
    client = pymongo.MongoClient(os.environ['MONGODB_URI'])
    db = client['test']
    collection = db['requests']
    request_details = collection.find_one({"request_id": request_id})
    return request_details

# RabbitMQ consumer
def fetch_request_from_rabbitmq(**kwargs):
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq_host'))
    channel = connection.channel()
    method_frame, header_frame, body = channel.basic_get(queue='your_queue', auto_ack=True)
    if body:
        kwargs['ti'].xcom_push(key='request_id', value=body.decode('utf-8'))
    connection.close()

# Create Terraform script
def create_terraform_script(request_details):
    with open("/path/to/terraform_script.tf", "w") as f:
        # Example: Generate Terraform script dynamically
        f.write(f"""
        resource "aws_instance" "example" {{
          ami           = "{request_details['ami']}"
          instance_type = "{request_details['instance_type']}"
        }}
        """)

# # Run Terraform
# def run_terraform():
#     subprocess.run(["terraform", "init"], cwd="/path/to/terraform_directory")
#     subprocess.run(["terraform", "apply", "-auto-approve"], cwd="/path/to/terraform_directory")

# Update MongoDB
def update_mongodb_status(request_id, status):
    client = pymongo.MongoClient("mongodb://<mongodb_host>:<port>")
    db = client['your_database']
    collection = db['requests']
    collection.update_one({"request_id": request_id}, {"$set": {"status": status}})

# Default arguments for the DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# Define DAG
with DAG(
    dag_id='idp_resource_provisioning',
    default_args=default_args,
    description='DAG for provisioning resources using Terraform',
    schedule_interval=None,
    start_date=datetime(2024, 12, 1),
    catchup=False,
) as dag:

    fetch_request_task = PythonOperator(
        task_id='fetch_request_from_rabbitmq',
        python_callable=fetch_request_from_rabbitmq,
    )

    fetch_details_task = PythonOperator(
        task_id='fetch_request_details_from_mongodb',
        python_callable=lambda **kwargs: get_mongodb_request(kwargs['ti'].xcom_pull(task_ids='fetch_request_from_rabbitmq', key='request_id')),
    )

    create_script_task = PythonOperator(
        task_id='create_terraform_script',
        python_callable=lambda **kwargs: create_terraform_script(kwargs['ti'].xcom_pull(task_ids='fetch_request_details_from_mongodb')),
    )

    # run_terraform_task = BashOperator(
    #     task_id='run_terraform',
    #     bash_command='cd /path/to/terraform_directory && terraform apply -auto-approve',
    # )

    update_status_task = PythonOperator(
        task_id='update_mongodb_status',
        python_callable=lambda **kwargs: update_mongodb_status(
            kwargs['ti'].xcom_pull(task_ids='fetch_request_from_rabbitmq', key='request_id'),
            "completed"
        ),
    )

    # Task dependencies
    # fetch_request_task >> fetch_details_task >> create_script_task >> run_terraform_task >> update_status_task
    fetch_request_task >> fetch_details_task >> create_script_task >> update_status_task