import amqp from "amqplib";

const testConnection = async () => {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL; // Adjust based on your setup
    const connection = await amqp.connect(rabbitUrl);
    console.log("Connected to RabbitMQ successfully.");
  } catch (error) {
    console.error("Connection Error:", error.message);
  }
};

export default testConnection;
