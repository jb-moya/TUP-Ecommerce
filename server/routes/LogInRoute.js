import express from "express";
import StudentSignUp from "../StudentSignUp.js";
import MockPasswordEncryptor from "../__mocks__/MockPasswordEncryptor.js";
import mockPool from "../__mocks__/MockDatabase.js.js";
// import PasswordEncryptor from "../PasswordEncryptor.js";

const logInRouteHandler = (query) => {
    StudentSignUp.initialize(query, mockPool, MockPasswordEncryptor);

    const router = express.Router();
    router.get("/login", async (req, res) => {
        const { student_id, password } = req.body;

        try {
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};

export default logInRouteHandler;
