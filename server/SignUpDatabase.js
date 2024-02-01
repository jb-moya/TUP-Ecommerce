import passwordEncryptor from "./PasswordEncryptor.js";

export default class SignUpDatabase {
    static sqlInsert = `INSERT INTO students (student_id, name, email_address, contact, password) VALUES (?, ?, ?, ?, ?)`;
    static sqlSelect = `SELECT * FROM students`;
        static students = [];
        static db = null;
        static passwordEncryptor = passwordEncryptor;

        static getDBConnection(db) {
            SignUpDatabase.db = db;
        }

        static async retrieveStudentsDB() {
            try {
                const queryResult = await util.promisify(db.query).bind(db)(
                    SignUpDatabase.sqlSelect
                );
                SignUpDatabase.students = queryResult;
            } catch (error) {
                console.error("Error retrieving student data:", error);
                throw new Error("Error retrieving student data");
            }
        }

    static validateUniqueness(value, fieldName, comparator) {
        const isDuplicate = SignUpDatabase.students.find(comparator);

        if (isDuplicate) {
            return `Student with this ${fieldName} already exists`;
        }

        return null;
    }

    static validateStudentId(studentId) {
        return SignUp.validateUniqueness(
            studentId,
            "ID",
            (s) => s.studentId === studentId
        );
    }

    static validateName(name) {
        return SignUp.validateUniqueness(name, "name", (s) => s.name === name);
    }

    static validateEmail(email) {
        return SignUp.validateUniqueness(
            email,
            "email",
            (s) => s.email_address === email
        );
    }

    static validateContact(contact) {
        return SignUp.validateUniqueness(
            contact,
            "contact",
            (s) => s.contact === contact
        );
    }

    static async insertData(req, res) {
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
            SignUpDatabase.sqlInsert,
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
