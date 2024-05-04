import connectDB from "./db/connect.js";

// might use express-async-errors
// might use express-async-errors

import express from "express";
import bodyParser from "body-parser";
// import connection from "./database.js";
// import mockPool from "./__mocks__/MockDatabase.js";
// import Query from "./Query.js";
import cors from "cors";
// import CustomerRouter from "./routes/CustomerRoute.js";1
import CartRouter from "./routes/CartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import ProductRouter from "./routes/ProductRoute.js";
import AuthenticationRoute from "./routes/AuthenticationRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ReviewRouter from "./routes/ReviewRoute.js";
import FeedbackRouter from "./routes/FeedbackRoute.js";
import cookieParser from "cookie-parser";
import TempRoute from "./routes/TempRoute.js";

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
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/cart", CartRouter);
app.use("/api/v1/feedback", FeedbackRouter);
app.use("/api/v1/temp", TempRoute);
app.use("/api/v1/order", OrderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Server running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
// app.use(express.json());
// app.use(cors());

// const mockConnection = await mockPool.getConnection();
// Query.getDBConnection(mockConnection);

// const flm = await mockConnection.query("SELECT * FROM student", []);
// console.log("flm: ", flm);

// app.use("/customer", CustomerRouter);
// app.use("/product", ProductRouter);

// // app.get("/api", (req, res) => {
// //     res.json({
// //         product: ["tinapay", "console", "tshirt", "house&lot"],
// //     });
// // });

// app.listen(port, () => console.log("Server running on port 5000"));
