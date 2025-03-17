import { connectMongoDB } from "../../../../lib/mongodb";
import Requesttype from "../../../../models/requesttype";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Connect to MongoDB
  await connectMongoDB();

  const url = new URL(req.url);
  const projectid = url.searchParams.get("projectId");

  const query = projectid ? { projectid } : {};

  const requesttype = await Requesttype.find(query);

  return NextResponse.json(requesttype, { status: 200 }); // return NextResponse.json({ requests }, { status: 200 });
}

export async function POST(req) {
  // Connect to MongoDB
  await connectMongoDB();

  const url = new URL(req.url);
  const projectid = url.searchParams.get("projectid");
  
  const requesttype = await Requesttype({
    projectid,
    status: "created",
  }).save();

  return NextResponse.json(
    { message: "Successfully added requests", requests: requesttype },
    { status: 201 }
  );
}

export async function PUT(req) {
  try {
    const { projectid, status } = await req.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Update requesttype or create if it doesn't exist
    const updatedRequestType = await Requesttype.findOneAndUpdate(
        { projectid },
        { status },
        { new: true, upsert: true }
      );
  
      return NextResponse.json(
        { message: "Successfully updated request type", requesttype: updatedRequestType },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating request type:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }

  

export async function DELETE(req) {
  await connectMongoDB();

  const url = new URL(req.url);
  const projectid = url.searchParams.get("projectId");

  if (!projectid) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  await Requesttype.deleteOne({ projectid });
  return NextResponse.json(
    { message: "Request type deleted successfully" },
    { status: 200 }
  );
}