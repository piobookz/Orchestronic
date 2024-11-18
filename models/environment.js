import mongoose, { Schema } from "mongoose";

const environmentSchema = new Schema({
  envname: { type: String },
  envtype: { type: String },
  region: { type: String },
});

const Environment =
  mongoose.models.Environment ||
  mongoose.model("Environment", environmentSchema);
export default Environment;
