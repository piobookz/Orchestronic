import { connectMongoDB } from "../../../../lib/mongodb";
import Request from "../../../../models/request";
import { NextResponse } from "next/server";

export async function GET() {
  // Connect to MongoDB
  await connectMongoDB();

  // Retrieve all requests
  const requests = await Request.find({});

  return NextResponse.json({ requests }, { status: 200 });
}

export async function POST(req) {
  const resources = await req.json(); // Parse JSON array
  // console.log("Incoming Requests:", resources);

  // Connect to MongoDB
  await connectMongoDB();

  // Save each resource
  const requests = await Request.insertMany(
    resources.map(({ id, name, type, userid, projectid, status }) => ({
      requestid: id,
      name,
      type,
      userid,
      projectid,
      status,
    }))
  );

  return NextResponse.json(
    { message: "Successfully added requests", requests },
    { status: 201 }
  );
}

export async function PUT(req) {
  const { status, projectid } = await req.json(); // Parse JSON object
  // console.log("Incoming Status:", status);

  // Connect to MongoDB
  await connectMongoDB();

  // Update all requests with the given project ID
  const updatedRequests = await Request.updateMany({ projectid }, { status });

  return NextResponse.json(
    { message: "Successfully updated requests", updatedRequests },
    { status: 200 }
  );
}
