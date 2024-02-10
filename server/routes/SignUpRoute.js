import express from "express";
import StudentSignUp from "../StudentSignUp.js";
import MockPasswordEncryptor from "../__mocks__/MockPasswordEncryptor.js";
// import PasswordEncryptor from "../PasswordEncryptor.js";

const signUpRouteHandler = (connection) => {
    StudentSignUp.initialize(connection, MockPasswordEncryptor);

    const router = express.Router();
    router.post("/signup", async (req, res) => {
        const { student_id, name, email_address, contact, password } = req.body;

        try {
            // Validate unique credentials
            await StudentSignUp.validateUniqueCredentials(req.body);

            // Create student
            await StudentSignUp.createStudent(req.body);

            // If everything is successful, send 200 OK
            res.sendStatus(200);
        } catch (error) {
            // If any error occurs during validation or creation, respond with error status
            res.status(400).json({ error: error.message }); // Specific error message from StudentSignUp
        }
    });

    return router;
};

export default signUpRouteHandler;
