import express from "express";
const router = express.Router();
import StudentSignUp from "../StudentSignUp.js";
import MockPasswordEncryptor from "../__mocks__/MockPasswordEncryptor.js";
import PasswordEncryptor from "../PasswordEncryptor.js";
import {
    EmailValidator,
    TUPEmailValidator,
} from "../validator/EmailValidator.js";
import NameValidator from "../validator/NameValidator.js";
import ContactValidator from "../validator/ContactValidator.js";
import StudentIDValidator from "../validator/StudentIDValidator.js";
import mockPool from "../__mocks__/MockDatabase.js";

// how to test 'post'

router.post("/signup", async (req, res) => {
    const { student_id, name, email_address, contact_number, password } =
        req.body;

    try {
        // StudentIDValidator.validate(student_id);
        // NameValidator.validate(name);
        // TUPEmailValidator.validate(email_address);
        // ContactValidator.validate(contact_number);
    } catch (error) {
        res.status(400).json({ error: `format error. ${error.message}` });
        return;
    }

    try {
        // await StudentSignUp.validateUniqueCredentials(req.body);
        // await StudentSignUp.createStudent(req.body);
        res.status(200).json({ message: "success" });
        return;
    } catch (error) {
        res.status(400).json({ error: `server: ${error.message}` });
        return;
    }
});

router.post("/login", async (req, res) => {
    const { student_id, password } = req.body;

    try {
        // StudentIDValidator.validate(student_id);
    } catch (error) {
        res.status(400).json({
            error: error.message + ` student_id ${student_id}`,
        });
        return;
    }

    try {
        // const user = await StudentSignUp.authenticateUser(student_id, password);
        res.status(200).json({ message: "success" });
        return;
    } catch (error) {
        res.status(400).json({ error: error.message });
        return;
    }
});

export default router;