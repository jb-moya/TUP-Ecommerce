import express from "express";
import SignUp from "../SignUp.js";

const signUpRouteHandler = (connection) => {
    // SignUp.getDBConnection(connection);

    const router = express.Router();
    router.post("/signup", (req, res) => {
        // const { student_id, name, email_address, contact, password } = req.body;

        // StudentTableDB.retreiveStudentsDB();

        // if (!student_id || !name || !email_address || !contact || !password) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }

        // const validationErrors = {
        //     student_id: StudentTableDB.validateStudentIdExistence(student_id),
        //     name: StudentTableDB.validateNameExistence(name),
        //     email_address: StudentTableDB.validateEmailExistence(email_address),
        //     contact: StudentTableDB.validateContactExistence(contact),
        // };

        // const hasErrors = Object.values(validationErrors).some(
        //     (error) => !!error
        // );

        // if (hasErrors) {
        //     return res.status(400).json({ errors: validationErrors });
        // }

        // StudentTableDB.insertData(req, res);

        res.sendStatus(200);
    });

    return router;
};

export default signUpRouteHandler;
