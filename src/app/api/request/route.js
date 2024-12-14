import { connectMongoDB } from "../../../../lib/mongodb";
import Request from "../../../../models/request";
import { NextResponse } from "next/server";

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
