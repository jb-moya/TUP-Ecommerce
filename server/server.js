import express from "express";
import db from "./database.js";
import SignUpRoute from "./routes/SignUpRoute.js";
import LoginRoute from "./routes/LogInRoute.js";

const app = express();

app.use(express.json());

// Pass the database connection to routes
app.use("/signup", SignUpRoute(db));
app.use("/login", LoginRoute(db));


app.get("/api", (req, res) => {
    res.json({
        users: ["user", "userTwo", "userThree", "userFour", "userSix"],
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
