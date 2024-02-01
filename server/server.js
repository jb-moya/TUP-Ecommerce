import express from "express";
import mysql from "mysql";
import SignUp from "./SignUp.js";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!Bvh3rtr0j0",
    database: "tupcommerce",
});

app.use(express.json());

SignUp.getDBConnection(db);

app.post("/signup", (req, res) => {
    const { student_id, name, email_address, contact, password } = req.body;

    SignUp.retreiveStudentsDB();

    if (SignUp.validateStudentId(student_id)) {
        return res
            .status(400)
            .json({ error: SignUp.validateStudentId(student_id) });
    }

    if (SignUp.validateName(name)) {
        return res.status(400).json({ error: SignUp.validateName(name) });
    }

    if (SignUp.validateEmail(email_address)) {
        return res
            .status(400)
            .json({ error: SignUp.validateEmail(email_address) });
    }

    if (SignUp.validateContact(contact)) {
        return res.status(400).json({ error: SignUp.validateContact(contact) });
    }

    if (SignUp.validatePassword(password)) {
        return res
            .status(400)
            .json({ error: SignUp.validatePassword(password) });
    }

    SignUp.signUp(req, res);
});

app.get("/api", (req, res) => {
    res.json({
        users: ["user", "userTwo", "userThree", "userFour", "userSix"],
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
