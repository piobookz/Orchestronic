import amqp from "amqplib";
import { NextResponse } from "next/server";

let listenerInitialized = false; // Singleton guard

// Helper to start listening for messages from a specified queue
export const startListening = async (queue) => {
  /* 
  The purpose of the listenerInitialized guard is to ensure that the consumer (startListening) only starts listening for messages once per queue. This is to prevent multiple consumers from simultaneously consuming the same queue, which could cause unintended behavior, like consuming duplicate messages or locking the queue.
  */

  if (listenerInitialized) {
    console.log("Listener is already running.");
    return;
  }

  try {
    listenerInitialized = true; // Set the guard to true

    const rabbitUrl = process.env.RABBITMQ_URL;
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
      durable: true,
      autoDelete: true, // The queue is deleted when the last consumer disconnects
    });
    console.log(`Listening for messages in queue: ${queue}`);

    // Consume messages from the queue
    await channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          console.log(`Received message: ${content}`);
          channel.ack(msg); // Acknowledge the message
        }
      },
      { noAck: false }
    );
    connection.close();
  } catch (error) {
    console.log("Error in listener:", error);
    listenerInitialized = false; // Reset the guard on failure
  }
};

// GET request handler to start listening on a specified queue
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const queue = searchParams.get("queue");
  console.log("Initializing GET request for queue:", queue);

  if (!queue) {
    return NextResponse.json({
      success: false,
      error: "Queue name is required.",
    });
  }

  try {
    // Start listening on the provided queue
    await startListening(queue);
    return NextResponse.json({
      success: true,
      message: `Listener started for queue: ${queue}`,
    });
  } catch (error) {
    console.log("Error in GET endpoint:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
