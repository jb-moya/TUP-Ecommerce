import dotenv from "dotenv";
import connectDB from "./db/connect.js";


import { Product } from "./models/Product.js";
import User from "./models/User.js";
import Review from "./models/Review.js";

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
};

const populateReviews = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        const users = await User.find({role: "customer"});
        console.log("Connected to MongoDB");
        // console.log(users);

        await Review.deleteMany();

        for (const user of users) {
            const product = await Product.findOne({name: "Ring"});

            // console.log("products", products);

            await Review.create({
                user: user._id,
                product: product._id,
                rating: Math.floor(Math.random() * 5) + 1,
                title: "This is a review",
                comment: "This is a comment",
            });
        }

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const defaultRatingAndNumOfReviews = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        const products = await Product.find();
        console.log("Connected to MongoDB");
        // console.log(users);

        for (const product of products) {
            const reviews = await Review.find({product: product._id});
           
            await Product.findByIdAndUpdate(product._id, {
                averageRating: 0,
                numOfReviews: 0,
            });
        }

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// start();
populateReviews();
// defaultRatingAndNumOfReviews();
