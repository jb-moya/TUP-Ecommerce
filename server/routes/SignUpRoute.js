import express from "express";
import StudentSignUp from "../StudentSignUp.js";
import MockPasswordEncryptor from "../__mocks__/MockPasswordEncryptor.js";
import PasswordEncryptor from "../PasswordEncryptor.js";
import {
    EmailValidator,
    TUPEmailValidator,
} from "../../ClientServer/EmailValidator.js";
import NameValidator from "../../ClientServer/NameValidator.js";
import ContactValidator from "../../ClientServer/ContactValidator.js";
import StudentIDValidator from "../../ClientServer/StudentIDValidator.js";

const isMockingPasswordEncryptor = true;

TUPEmailValidator.setValidator(EmailValidator);

const PasswordEncryptorUsed = isMockingPasswordEncryptor
    ? MockPasswordEncryptor
    : PasswordEncryptor;

const signUpRouteHandler = (query) => {
    StudentSignUp.initialize(query, PasswordEncryptorUsed);

    const router = express.Router();
    router.post("/signup", async (req, res) => {
        const { student_id, name, email_address, contact_number, password } =
            req.body;

        try {
            StudentIDValidator.validate(student_id);
            NameValidator.validate(name);
            TUPEmailValidator.validate(email_address);
            ContactValidator.validate(contact_number);
        } catch (error) {
            res.status(400).json({ error: `format error. ${error.message}` });
            return;
        }

        try {
            await StudentSignUp.validateUniqueCredentials(req.body);
            await StudentSignUp.createStudent(req.body);
            res.status(200).json({ message: "success" });
            return;
        } catch (error) {
            res.status(400).json({ error: error.message });
            return;
        }
    });

    return router;
};

export default signUpRouteHandler;
