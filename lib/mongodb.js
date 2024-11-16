import mongoose from "mongoose";

export const componentMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongodb");
    } catch(error) {
        console.log("Error connecting to mongodb: ", error);
    }
}