import express from "express";
import connection from "./database.js";
import signUpRouteHandler from "./routes/SignUpRoute.js";
import logInRouteHandler from "./routes/LogInRoute.js";

const app = express();

app.use(express.json());

// Pass the database connection to routes
app.use("/signup", signUpRouteHandler(connection));
app.use("/login", logInRouteHandler(connection));

app.get("/api", (req, res) => {
    res.json({
        users: ["user", "userTwo", "userThree", "userFour", "userSix"],
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
