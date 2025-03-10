from airflow import DAG
from airflow.operators.python import PythonOperator
import socketio
import time
from datetime import datetime

def send_vm_notification():
    sio = socketio.Client()

    try:
        sio.connect("http://host.docker.internal:4000")
        if sio.connected:
            sio.emit('notification', {'message': 'Your virtual machine is being created now'})
            time.sleep(2)
            sio.disconnect()
            return "Notification sent successfully"
        else:
            return "Failed to establish a Socket.IO connection"

    except Exception as e:
        return f"Failed to send notification: {str(e)}"

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2025, 1, 19),
    'retries': 1,
}

with DAG(
    dag_id='notification',
    default_args=default_args,
    catchup=False,
) as dag:

    send_notification = PythonOperator(
        task_id='send_notification',
        python_callable=send_vm_notification,
    )

send_notification
