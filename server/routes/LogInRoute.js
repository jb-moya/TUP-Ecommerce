import express from "express";
import StudentTableDB from "../StudentTableDB.js";

const logInRouteHandler = (db) => {
    StudentTableDB.getDBConnection(db);
    
    const router = express.Router();
    router.get("/login", (req, res) => {
        const { student_id, password } = req.body;

        StudentTableDB.retreiveStudentsDB();

        if (!student_id || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const validationErrors = {
            password: StudentTableDB.validatePassword(student_id, password),
        };

        const hasErrors = Object.values(validationErrors).some(
            (error) => !!error
        );

        if (hasErrors) {
            return res.status(400).json({ errors: validationErrors });
        }

        res.status(200).json({ message: "Login successful" });
    });

    return router;
};

export default logInRouteHandler;