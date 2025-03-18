import mongoose, { Schema } from "mongoose";

const requesttypeSchema = new Schema({
  projectid: { type: String, required: true },
  status: { type: String, required: true },
});

const Requesttype =
  mongoose.models.Requesttype ||
  mongoose.model("Requesttype", requesttypeSchema);
export default Requesttype;
