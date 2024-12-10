import { connectMongoDB } from "../../../../lib/mongodb";
import Resource from "../../../../models/resource";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Parse JSON
  const {
    userID,
    resourceName,
    region,
    os,
    type,
    adminUser,
    adminPassword,
    vmSize,
    allocation,
    projectID,
  } = await req.json();
  /* console.log(
    userID,
    resourceName,
    region,
    os,
    type,
    adminUser,
    adminPassword,
    vmSize,
    allocation,
    projectID
  ); */

  // Connect to MongoDB
  await connectMongoDB();

  //Create environment details
  await Resource.create({
    userid: userID,
    vmname: resourceName,
    vmsize: vmSize,
    region,
    os,
    type,
    username: adminUser,
    password: adminPassword,
    allocationip: allocation,
    projectid: projectID,
  });

  return NextResponse.json(
    { message: "Successfully added resource" },
    { status: 201 }
  );
}

export async function GET() {
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const resources = await Resource.find({});
    // console.log("Fetched resources:", resources);

    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error("Error fetching resources:", error);

    return NextResponse.json(
      { message: "Error fetching resources", error: error.message },
      { status: 500 }
    );
  }
}
