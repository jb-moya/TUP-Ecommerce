import dotenv from "dotenv";
import connectDB from "./db/connect.js";

import Product from "./models/Product.js";

const { default: info } = await import("./products.json", {
    assert: {
        type: "json",
    },
});

dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await Product.deleteMany();
        await Product.create(info);
        console.log("Connected to MongoDB");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();