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

const mockConnection = await mockPool.getConnection();
Query.getDBConnection(mockConnection);
 
const flm = await mockConnection.query("SELECT * FROM student", []);
console.log("flm: ", flm);

const signUpRouter = signUpRouteHandler(Query, mockConnection);
const logInRouter = logInRouteHandler(Query, mockConnection);

app.use(signUpRouter);
app.use(logInRouter);

app.get("/api", (req, res) => {
    res.json({
        product: ["tinapay", "console", "tshirt", "house&lot"],
    });
});

app.listen(port, () => console.log("Server running on port 5000"));
