import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
  requestid: { type: String },
  name: { type: String },
  type: { type: String },
  userid: { type: String },
  projectid: { 
    type: String,
    ref: "Project"
  },
  statuspm: { type: String },
  statusops: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);
export default Request;
