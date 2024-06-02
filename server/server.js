import connectDB from "./db/connect.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CartRouter from "./routes/CartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import ProductRouter from "./routes/ProductRoute.js";
import AuthenticationRoute from "./routes/AuthenticationRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ReviewRouter from "./routes/ReviewRoute.js";
import FeedbackRouter from "./routes/FeedbackRoute.js";
import cookieParser from "cookie-parser";
import TempRoute from "./routes/TempRoute.js";
import TransactionRouter from "./routes/TransactionRoute.js";
import ProductViolationRouter from "./routes/ProductViolationRoute.js";
import { Product } from "./models/Product.js";
import { Transaction } from "./models/Transaction.js";
import nodemailer from "nodemailer";
import Users from "./models/User.js";

const { Customer, Organization, Admin } = Users;

import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const app = express();

import notFoundMiddleware from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-handler.js";

// CONTINUE AT 3:19:31 https://youtu.be/qwfE7fSVaZM?t=11971
// https://www.youtube.com/watch?v=qwfE7fSVaZM&t=26857s

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", AuthenticationRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/violations", ProductViolationRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/cart", CartRouter);
app.use("/api/v1/feedback", FeedbackRouter);
app.use("/api/v1/transactions", TransactionRouter);
app.use("/api/v1/temp", TempRoute);
app.use("/api/v1/order", OrderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

// const updateExistingProducts = async () => {
//     try {
//         await await Product.updateMany(
//             {},
//             {
//                 $set: {
//                     productStatus: "enabled",
//                     // hasViolation: false,
//                 },
//             }
//         );

//         console.log("All products have been updated with new fields");
//     } catch (err) {
//         console.error("Error updating products", err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

const updateUserProducts = async () => {
    try {
        await Organization.updateMany({}, { $set: { status: "approved" } });

        console.log("All orgs have been updated with pending status");
    } catch (err) {
        console.error("Error updating orgs", err);
    } finally {
        mongoose.connection.close();
    }
};

const updateUserProductsSoldCount = async () => {
    try {
        const products = await Product.find({});
        const updatePromises = products.map((product) => {
            const randomSoldCount = Math.floor(Math.random() * 9000) + 1000; // Random number between 1000 and 10000
            return Product.updateOne(
                { _id: product._id },
                { $set: { soldCount: randomSoldCount } }
            );
        });

        await Promise.all(updatePromises);
        console.log("All products have been updated with random sold counts");
    } catch (err) {
        console.error("Error updating orgs or products", err);
    } finally {
        mongoose.connection.close();
    }
};

const deleteAllTransactions = async () => {
    try {
        await Transaction.deleteMany({});

        console.log("All transactions have been deleted");
    } catch (err) {
        console.error("Error deleting transactions", err);
    } finally {
        mongoose.connection.close();
    }
};

// const updateUserProducts = async () => {
//     try {
//         await Organization.updateMany(
//             {}, // Match all documents
//             { $set: { createdAt: new Date("2023-01-01T00:00:00Z") } },
//             { multi: true } // Update multiple documents
//         );

//         console.log("All orgs have been updated with timestamps");
//     } catch (err) {
//         console.error("Error updating orgs", err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        // await updateUserProductsSoldCount();
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log("Email sent: " + info.response);;
        // });
        app.listen(port, console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();

// const updateExistingProducts = async () => {
//     try {
//         await await Product.updateMany(
//             {},
//             {
//                 $set: {
//                     violation: null,
//                 },
//             }
//         );

//         console.log("All products have been updated with new fields");
//     } catch (err) {
//         console.error("Error updating products", err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// const setRandomProductWithViolation = async () => {
//     try {
//         // Fetch a random product
//         const randomProduct = await Product.aggregate([
//             { $sample: { size: 1 } },
//         ]);

//         if (randomProduct.length > 0) {
//             const productId = randomProduct[0]._id;

//             // Update the product's hasViolation field to true
//             await Product.updateOne(
//                 { _id: productId },
//                 { $set: { hasViolation: true } }
//             );

//             console.log(
//                 `Product with ID ${productId} has been updated with hasViolation set to true`
//             );
//         } else {
//             console.log("No products found");
//         }
//     } catch (err) {
//         console.error("Error updating random product", err);
//     } finally {
//         mongoose.connection.close();
//     }
// };
