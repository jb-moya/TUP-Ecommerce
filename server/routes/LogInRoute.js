import express from "express";
import StudentSignUp from "../StudentSignUp.js";
import MockPasswordEncryptor from "../__mocks__/MockPasswordEncryptor.js";
import StudentIDValidator from "../validator/StudentIDValidator.js";
import NameValidator from "../validator/NameValidator.js";

// import PasswordEncryptor from "../PasswordEncryptor.js";

const logInRouteHandler = (query, mockConnection) => {
    StudentSignUp.initialize(query, mockConnection, MockPasswordEncryptor);

    const router = express.Router();
    router.get("/login", async (req, res) => {
        // res.status(200).json({ message: "success" });

        const { student_id, password } = req.query;

        try {
            console.log("student_idserver: ", student_id);
            StudentIDValidator.validate(student_id);
        } catch (error) {
            res.status(400).json({
                error: error.message + ` student_id ${student_id}`,
            });
            return;
        }

        try {
            const user = await StudentSignUp.authenticateUser(
                student_id,
                password
            );
            res.status(200).json({ message: "success" });
            return;
        } catch (error) {
            res.status(400).json({ error: error.message });
            return;
        }
    });

    return router;
};

export default logInRouteHandler;
