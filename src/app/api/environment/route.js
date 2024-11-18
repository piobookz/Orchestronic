import { connectMongoDB } from "../../../../lib/mongodb";

import Environment from "../../../../models/environment";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Parse JSON
  const { envname, envtype, region } = await req.json();
  console.log(envname, envtype, region);

  // Connect to MongoDB
  await connectMongoDB();

  // Create policy document
  await Environment.create({
    envname,
    envtype,
    region,
  });

  return NextResponse.json(
    { message: "Successful added environment" },
    { status: 201 }
  );
}
