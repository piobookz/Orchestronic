import { connectMongoDB } from "../../../../lib/mongodb";
import Request from "../../../../models/request";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Connect to MongoDB
  await connectMongoDB();

  const url = new URL(req.url);
  const projectid = url.searchParams.get("projectid");

  const query = projectid ? { projectid } : {};

  // Retrieve all requests
  const requests = await Request.find(query);

  return NextResponse.json(requests, { status: 200 }); // return NextResponse.json({ requests }, { status: 200 });
}

export async function POST(req) {
  const resources = await req.json(); // Parse JSON array
  // console.log("Incoming Requests:", resources);

  // Connect to MongoDB
  await connectMongoDB();

  // Save each resource
  const requests = await Request.insertMany(
    resources.map(
      ({ id, name, type, userid, projectid, statuspm, statusops }) => ({
        requestid: id,
        name,
        type,
        userid,
        projectid,
        statuspm,
        statusops,
      })
    )
  );

  return NextResponse.json(
    { message: "Successfully added requests", requests },
    { status: 201 }
  );
}

export async function PUT(req) {
  const { projectid, ...updates } = await req.json(); // Destructure the request JSON

  // Check if there is a valid `projectid` and update fields are not empty
  if (!projectid || Object.keys(updates).length === 0) {
    return NextResponse.json(
      { message: "Invalid input, project ID and updates are required" },
      { status: 400 }
    );
  }

  // Connect to MongoDB
  await connectMongoDB();

  // Perform the update
  const updatedRequests = await Request.updateMany(
    { projectid },
    { $set: updates } // Only update fields provided in the body
  );

  return NextResponse.json(
    { message: "Successfully updated requests", updatedRequests },
    { status: 200 }
  );
}
