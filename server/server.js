import express from "express";
import mysql from "mysql";
import SignUpDatabase from "./SignUpDatabase.js";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!Bvh3rtr0j0",
    database: "tupcommerce",
});

app.use(express.json());

SignUpDatabase.getDBConnection(db);

app.post("/signup", (req, res) => {
    const { student_id, name, email_address, contact, password } = req.body;

    SignUpDatabase.retreiveStudentsDB();

    if (!student_id || !name || !email_address || !contact || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const validationErrors = {
        student_id: SignUpDatabase.validateStudentId(student_id),
        name: SignUpDatabase.validateName(name),
        email_address: SignUpDatabase.validateEmail(email_address),
        contact: SignUpDatabase.validateContact(contact),
    };

    const hasErrors = Object.values(validationErrors).some((error) => !!error);

    if (hasErrors) {
        return res.status(400).json({ errors: validationErrors });
    }

    SignUpDatabase.insertData(req, res);
});

app.get("/api", (req, res) => {
    res.json({
        users: ["user", "userTwo", "userThree", "userFour", "userSix"],
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
