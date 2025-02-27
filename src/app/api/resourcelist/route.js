import { connectMongoDB } from "../../../../lib/mongodb";
import Resource from "../../../../models/resource";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch resources from MongoDB
    const resources = await Resource.find(); // Corrected line

    // Log the fetched resources for debugging
    console.log("Resources fetched:", resources);

    // Return the resources as a JSON response
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { message: "Error fetching resources", error: error.message },
      { status: 500 }
    );
  }
}