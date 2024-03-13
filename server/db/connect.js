import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const adminPassword = process.env.MONGODB_PASSWORD;


const connectDB = (url) => {
    return mongoose.connect(url);
};

export default connectDB;
