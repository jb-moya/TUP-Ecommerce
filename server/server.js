import express from "express";
import connection from "./database.js";
import mockPool from "./__mocks__/MockDatabase.js";
import signUpRouteHandler from "./routes/SignUpRoute.js";
import logInRouteHandler from "./routes/LogInRoute.js";
import Query from "./Query.js";
import cors from "cors";

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());

// Pass the database connection to routes

const mockConnection = await mockPool.getConnection();
Query.getDBConnection(mockConnection);

const signUpRouter = signUpRouteHandler(Query, port);
const logInRouter = logInRouteHandler(Query, port);

app.use(signUpRouter);
app.use(logInRouter);

app.get("/api", (req, res) => {
    res.json({
        product: ["tinapay", "console", "tshirt", "house&lot"],
    });
});

app.listen(port, () => console.log("Server running on port 5000"));
