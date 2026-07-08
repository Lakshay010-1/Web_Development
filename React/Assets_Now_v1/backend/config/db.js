import mongoose from "mongoose";
import "dotenv/config";

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("DB connection established");
    } catch (error) {
        console.error("DB connection failed : ", error);
        process.exit(1);
    }
}

export { connectDB };