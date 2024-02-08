import PasswordEncryptor from "./PasswordEncryptor.js";
import databaseQueries from "./databaseQueries.js";

export default class SignUp {
    // static sqlInsert = `INSERT INTO students (student_id, name, email_address, contact, password) VALUES (?, ?, ?, ?, ?)`;
    // static sqlSelect = `SELECT * FROM students`;
    static students = [];
    static studentTableName = "student";

    static getAllStudentRecords() {
        SignUp.students = databaseQueries.getAllRecords("student");
    }


    static isDataExists(comparator) {
        const foundStudent = SignUp.students.find(comparator);
        return !!foundStudent;
    }

    static validateStudentIdExistence(studentId) {
        return SignUp.isDataExists((s) => s.studentId === studentId);
    }

    static validateNameExistence(name) {
        return SignUp.isDataExists((s) => s.name === name);
    }

    static validateEmailExistence(email) {
        return SignUp.isDataExists((s) => s.email_address === email);
    }

    static validateContactExistence(contact) {
        return SignUp.isDataExists((s) => s.contact === contact);
    }

    static getStudent(studentId) {
        return SignUp.students.find((s) => s.studentId === studentId);
    }

    static getStudentName(studentId) {
        return SignUp.students.find((s) => s.studentId === studentId).name;
    }

    static getStudentEmail(studentId) {
        return SignUp.students.find((s) => s.studentId === studentId)
            .email_address;
    }

    static getStudentContact(studentId) {
        return SignUp.students.find((s) => s.studentId === studentId).contact;
    }

    static async validatePassword(studentId, password) {
        const student = SignUp.getStudent(studentId);
        if (!student) {
            return false;
        }

        return await PasswordEncryptor.comparePasswords(
            password,
            student.password
        );
    }

    static async insertData(req, res) {
        const { studentId, name, emailAddress, contact, password } = req.body;

        const encryptedPassword = await PasswordEncryptor.encryptPassword(
            password
        );

        const newStudent = {
            studentId,
            name,
            emailAddress,
            contact,
            password: encryptedPassword,
        };

        SignUp.db.query(
            SignUp.sqlInsert,
            [studentId, name, emailAddress, contact, encryptedPassword],
            (error, result) => {
                if (error) {
                    console.error("Error during sign-up:", error);
                    return res
                        .status(500)
                        .json({ error: "Internal server error" });
                }
            }
        );

        res.status(201).json({
            message: "Student signed up successfully",
            student: newStudent,
        });
    }
}
