import { connectMongoDB } from "../../../../lib/mongodb";
import Project from "../../../../models/project";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const url = new URL(req.url);
    const pathWithNamespace = url.searchParams.get("pathWithNamespace");
    const userId = url.searchParams.get("userId");
    const projectId = url.searchParams.get("projectId");

    let query = {};

    if (pathWithNamespace) {
      query.pathWithNamespace = pathWithNamespace;
    }

    if (userId) {
      query.userId = userId;
    }

    if (projectId) {
      query._id = projectId;
    }

    const projects = await Project.find(query);

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      projectName = "",
      projectDescription = "",
      pathWithNamespace = "",
      branch = "",
      rootPath = "",
      userId = "",
      statuspm = "Pending",
      statusops = "Pending",
    } = body;

    // Validate required fields
    if (!projectName || !pathWithNamespace || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the project already exists
    const existingProject = await Project.findOne({ pathWithNamespace });
    if (existingProject) {
      return NextResponse.json(
        {
          message: "Project already exists",
          projectId: existingProject._id,
        },
        { status: 200 }
      );
    }

    // Create a new project
    const newProject = new Project({
      projectName: projectName.trim(),
      projectDescription: projectDescription.trim(),
      pathWithNamespace: pathWithNamespace.trim(),
      branch: branch.trim(),
      rootPath: rootPath.trim(),
      userId: userId.trim(),
      statuspm: statuspm.trim(),
      statusops: statusops.trim(),
    });

    // Save the new project
    const savedProject = await newProject.save();

    return NextResponse.json(
      { message: "Project created successfully", projectId: savedProject._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectMongoDB();

  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  await Project.deleteOne({ _id: projectId });
  return NextResponse.json(
    { message: "Project deleted successfully" },
    { status: 200 }
  );
}

export async function PUT(req) {
  try {
    const { projectid, ...updates } = await req.json();
    console.log("Updating Project:", projectid, updates);

    // Connect to MongoDB
    await connectMongoDB();

    // Validate input
    if (!projectid || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: "Project ID and update fields are required" },
        { status: 400 }
      );
    }

    // Perform the update and return the updated document
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectid },
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Successfully updated request", updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
