import { connectMongoDB } from "../../../../lib/mongodb";
import Project from "../../../../models/project";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Retrieve all projects
        const projects = await Project.find({});
        console.log("Projects fetched:", projects);
        
        return NextResponse.json(projects.data, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { message: "Failed to retrieve projects" }, { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            projectName = "",
            projectDescription = "",
            branch = "",
            rootPath = "",
            userId = "",
        } = body;

        await connectMongoDB();

        const newProject = new Project({
            projectName: projectName.trim(),
            projectDescription: projectDescription.trim(),
            branch: branch.trim(),
            rootPath: rootPath.trim(),
            userId: userId.trim(),
        });

        const savedProject = await newProject.save();

        return NextResponse.json({ message: "Project created successfully", projectId: savedProject._id },{ status: 201 });

    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ message: "Failed to create project" },{ status: 500 });
    }
}