import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection URI from environment variable
const uri = process.env.MONGODB_URI;

// Function to get resource details from MongoDB
async function getResourceDetails(resourceName, rgName) {
  let client;
  try {
    // Check if MongoDB URI is available
    if (!uri) {
      console.error("MONGODB_URI is not set in environment variables");
      return null;
    }

    client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("test");
    const resources = database.collection("resources");
    
    // Extract project ID from rgName (format: rg-<projectId>)
    const projectId = rgName.replace('rg-', '');
    
    console.log(`Looking for VM with name: ${resourceName} and projectId: ${projectId}`);
    
    // Query resource by VM name and project ID
    const resource = await resources.findOne({
      vmname: resourceName,
      projectid: projectId
    });
    
    return resource;
  } catch (error) {
    console.error("Error retrieving resource from MongoDB:", error);
    return null;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function POST(req) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const { resourceName, rgName, os } = body;
    
    console.log("Received connection request for VM:", resourceName, "in RG:", rgName);
    
    // Validate required fields
    if (!resourceName || !rgName || !os) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: resourceName, rgName, and os are required'
        },
        { status: 400 }
      );
    }
    
    // Get resource details from MongoDB
    const resource = await getResourceDetails(resourceName, rgName);
    
    // Handle case where MongoDB connection fails or resource not found
    if (!resource) {
      return NextResponse.json(
        {
          success: false,
          message: `VM '${resourceName}' not found in resource group '${rgName}' or database connection failed`
        },
        { status: 404 }
      );
    }
    
    // Check if the VM has a public IP
    if (!resource.publicIP) {
      return NextResponse.json(
        {
          success: false,
          message: `VM '${resourceName}' does not have a public IP address assigned yet`
        },
        { status: 400 }
      );
    }
    
    // Return VM details for connection
    return NextResponse.json({
      success: true,
      resourceGroupExists: true,
      vmExists: true,
      vmDetails: {
        name: resourceName,
        publicIP: resource.publicIP,
        os: os,
        username: resource.username,
        status: "Running"
      }
    });
  } catch (error) {
    console.error("Error in connect-vm API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to VM",
        error: error.message || "Unknown server error"
      },
      { status: 500 }
    );
  }
}