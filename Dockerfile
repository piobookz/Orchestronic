FROM apache/airflow:2.10.4

# Install system dependencies (curl, unzip) and Terraform
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Terraform
RUN curl -LO https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip && \
    unzip terraform_1.5.7_linux_amd64.zip -d /usr/local/bin && \
    rm terraform_1.5.7_linux_amd64.zip && \
    terraform --version  # Verify terraform installation

# Set PATH to ensure terraform is found
ENV PATH=$PATH:/usr/local/bin

# Switch back to the airflow user
USER airflow

COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt
