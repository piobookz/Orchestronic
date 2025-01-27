FROM apache/airflow:2.10.4
COPY /airflow-project/requirements.txt .
RUN pip install -r requirements.txt
