import express from "express";
import SignUp from "../SignUp.js";

const logInRouteHandler = (db) => {
    // SignUp.getDBConnection(db);

    const router = express.Router();
    router.get("/login", (req, res) => {
        const { student_id, password } = req.body;

        SignUp.retreiveStudentsDB();

        if (!student_id || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const validationErrors = {
            password: SignUp.validatePassword(student_id, password),
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
