import mongoose, { Schema } from "mongoose";

const requesttypeSchema = new Schema({
  projectid: { 
    type: String,
    ref: "Project"
  },
  status: { type: String },
});

const Requesttype =
  mongoose.models.Requesttype || mongoose.model("Requesttype", requesttypeSchema);
export default Requesttype;
