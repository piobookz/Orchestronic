import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    projectName: { type: String },
    projectDescription: { type: String },
    pathWithNamespace: { type: String },
    branch: { type: String },
    rootPath: { type: String },
    userId: { type: String },
    statuspm: { type: String },
    statusops: { type: String },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists to avoid redefining it
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
