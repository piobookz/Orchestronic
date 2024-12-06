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
  } = await req.json();
  console.log(
    userID,
    resourceName,
    region,
    os,
    type,
    adminUser,
    adminPassword,
    vmSize,
    allocation
  );

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
  });

  return NextResponse.json(
    { message: "Successfully added resource" },
    { status: 201 }
  );
}
