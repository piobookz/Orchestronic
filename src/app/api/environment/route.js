import { connectMongoDB } from "../../../../lib/mongodb";

import Environment from "../../../../models/environment";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Parse JSON
  const { environmentName, environmentType, region } = await req.json();
  console.log(environmentName, environmentType, region);

  // Connect to MongoDB
  await connectMongoDB();

  //Create environment details
  await Environment.create({
    envname: environmentName,
    envtype: environmentType,
    region,
  });

  return NextResponse.json(
    { message: "Successfully added environment" },
    { status: 201 }
  );
}
