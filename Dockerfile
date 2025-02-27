FROM apache/airflow:2.10.4

# Install system dependencies
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Terraform
RUN curl -LO https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip && \
    unzip terraform_1.5.7_linux_amd64.zip -d /usr/local/bin && \
    rm terraform_1.5.7_linux_amd64.zip && \
    terraform --version

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Set PATH
ENV PATH=$PATH:/usr/local/bin

# Switch to airflow user
USER airflow
WORKDIR /opt/airflow/

# Copy package.json first for Docker cache
COPY package.json package-lock.json ./

# Install dependencies and nvm
USER root
RUN apt-get update && apt-get install -y curl

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Install Node.js 18 using nvm
RUN bash -c "source $HOME/.nvm/nvm.sh && nvm install 18"

# Use Node.js 18
RUN bash -c "source $HOME/.nvm/nvm.sh && nvm use 18"

# Install project dependencies
RUN npm install

# Copy all files
COPY . .

USER airflow
# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
