import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    gitlabUsername: {
        type: String,
        required: true,
    },
    gitlabEmail: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['dev', 'pm', 'ops'],
        required: true,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User =
    mongoose.models.User ||
    mongoose.model("User", userSchema);
export default User;