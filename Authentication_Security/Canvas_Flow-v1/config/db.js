import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.URI}/${process.env.DB}`);
    } catch (err) {
        console.error("MongoDB connection error", err.message);
        process.exit(1);
    }
};

export { connectDB };