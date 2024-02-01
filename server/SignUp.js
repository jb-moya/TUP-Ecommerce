import passwordEncryptor from "./PasswordEncryptor.js";

export default class SignUp {
    static sqlInsert = `INSERT INTO students (student_id, name, email_address, contact, password) VALUES (?, ?, ?, ?, ?)`;
    static sqlSelect = `SELECT * FROM students`;
    static students = [];
    static db = null;
    static passwordEncryptor = passwordEncryptor;

    static getDBConnection(db) {
        SignUp.db = db;
    }

    static async retrieveStudentsDB() {
        try {
            const queryResult = await util.promisify(db.query).bind(db)(
                SignUp.sqlSelect
            );
            SignUp.students = queryResult;
        } catch (error) {
            console.error("Error retrieving student data:", error);
            throw new Error("Error retrieving student data");
        }
    }

    static validateStudentId(studentId) {
        if (!studentId) {
            return "Student ID is required";
        }

        const isStudentAlreadyExists = SignUp.students.find(
            (s) => s.studentId === studentId
        );

        if (isStudentAlreadyExists) {
            return "Student with this ID already exists";
        }

        return null;
    }

    static validateName(name) {
        if (!name) {
            return "Name is required";
        }

        const isContactAlreadyExists = SignUp.students.find(
            (s) => s.contact === contact
        );

        if (isContactAlreadyExists) {
            return "Student with this contact already exists";
        }

        return null;
    }

    static validateEmail(email) {
        if (!email) {
            return "Email is required";
        }

        const isEmailAlreadyExists = SignUp.students.find(
            (s) => s.email_address === email
        );

        if (isEmailAlreadyExists) {
            return "Student with this email already exists";
        }

        return null;
    }

    static validateContact(contact) {
        if (!contact) {
            return "Contact is required";
        }

        const isContactAlreadyExists = SignUp.students.find(
            (s) => s.contact === contact
        );

        if (isContactAlreadyExists) {
            return "Student with this contact already exists";
        }

        return null;
    }

    static validatePassword(password) {
        if (!password) {
            return "Password is required";
        }

        return null;
    }

    static async signUp(req, res) {
        const { studentId, name, emailAddress, contact, password } = req.body;

        const encryptedPassword = await this.passwordEncryptor.encryptPassword(
            password
        );

        const newStudent = {
            studentId,
            name,
            emailAddress,
            contact,
            password: encryptedPassword,
        };

        db.query(
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
