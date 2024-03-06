import express from "express";
import connection from "./database.js";
import mockPool from "./__mocks__/MockDatabase.js";
import Query from "./Query.js";
import cors from "cors";
import CustomerRouter from "./routes/CustomerRoute.js";
import ProductRouter from "./routes/ProductRoute.js";

import dotenv from "dotenv";

const app = express();

// const port = 5000;

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
