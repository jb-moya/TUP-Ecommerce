import express from "express";
import connection from "./database.js";
import signUpRouteHandler from "./routes/SignUpRoute.js";
import logInRouteHandler from "./routes/LogInRoute.js";
import Query from "./Query.js";

const app = express();

app.use(express.json());

// Pass the database connection to routes
Query.getDBConnection(connection);

// const record = await Query.getRecord("student", {
//     student_id: "tupm-21-1664",
// });

// const recordStock = await Query.getRecord("stock", {
//     shop_id: "1",
//     product_id: "2",
//     // product_stock: null, // why
// });

// const user = await Query.authenticateUser("@gmail.com", "hashedPassword");

// console.log("user:: ", user);

// console.log("record:: ", record);
// console.log("recordStock:: ", recordStock);

// const allRecords = await Query.getAllRecords("student");

// console.log("allRecords:: ", allRecords);

// app.use("/signup", signUpRouteHandler(connection));
// app.use("/login", logInRouteHandler(connection));

app.get("/api", (req, res) => {
    res.json({
        users: [
            "user",
            "userTwo",
            "userThree",
            "userFour",
            "userSix",
            "userSeven",
        ],
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
