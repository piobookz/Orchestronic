import { connectMongoDB } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import Notification from "../../../../models/notification";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const projectName = searchParams.get("projectName");
  const detail = searchParams.get("detail");
  const userId = searchParams.get("userId");

  // Connect to MongoDB
  await connectMongoDB();

  //Create environment details
  await Notification.create({
    projectName: projectName,
    detail: detail,
    userId: userId,
  });

  return NextResponse.json(
    { message: "Successfully added environment" },
    { status: 201 }
  );
}

export async function GET(req) {
  // Connect to MongoDB
  await connectMongoDB();

  // Extract userId from query parameters
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const projects = await Notification.find({ userId });

  return NextResponse.json(projects, { status: 200 });
}
