import { connectMongoDB } from "../../../../lib/mongodb";
import Project from "../../../../models/project";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Extract query parameters from the URL
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const pathWithNamespace = url.searchParams.get("pathWithNamespace");
    const userId = url.searchParams.get("userId");

    let query = { userId };
    if (pathWithNamespace) {
      query.pathWithNamespace = pathWithNamespace;
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
