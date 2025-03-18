import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  projectName: { type: String },
  detail: { type: String },
  userId: { type: String },
  date: { type: Date, default: Date.now },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
