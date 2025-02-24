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





// const environmentSchema = new mongoose.Schema({
//   envname: {
//     type: String,
//     required: true,
//   },
//   envtype: {
//     type: String,
//     enum: ['Testing', 'Staging', 'Production'],
//     required: true,
//   },
//   region: {
//     type: String,
//     required: true,
//   },
//   projectId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });