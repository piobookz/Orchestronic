import amqp from "amqplib";
import { NextResponse } from "next/server";
// Helper to connect to RabbitMQ and send messages to the queue
const sendToQueue = async (queue, message) => {
  const rabbitUrl = process.env.RABBITMQ_URL;
  let connection;

  try {
    connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    console.log(`Sending message to queue: ${queue}`);

    // Send the message to the queue
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    channel.close();
    console.log(`Message sent to queue: ${queue}`);
  } catch (error) {
    console.error("Error in sendToQueue:", error);
    throw error;
  } finally {
    if (connection) await connection.close();
  }
};

// POST request handler to send a message to the RabbitMQ queue
export async function POST(req, res) {
  const { message, queue } = await req.json(); // Get the message and queue from the request body
  console.log("Message to Queue:", message, "Queue:", queue);

  if (!message || !queue) {
    return NextResponse.json({
      success: false,
      error: "Missing message or queue",
    });
  }

  try {
    // Send the message to the specified queue
    await sendToQueue(queue, message);
    return NextResponse.json({
      success: true,
      message: "Message sent to RabbitMQ successfully",
    });
  } catch (error) {
    console.error("Error in POST endpoint:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
