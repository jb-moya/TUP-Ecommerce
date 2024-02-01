import passwordEncryptor from "./PasswordEncryptor.js";

export default class StudentTableDB {
    static sqlInsert = `INSERT INTO students (student_id, name, email_address, contact, password) VALUES (?, ?, ?, ?, ?)`;
    static sqlSelect = `SELECT * FROM students`;
    static students = [];
    static db = null;
    static passwordEncryptor = passwordEncryptor;

    static getDBConnection(db) {
        StudentTableDB.db = db;
    }

    static async retrieveStudentsDB() {
        try {
            const queryResult = await util.promisify(db.query).bind(db)(
                StudentTableDB.sqlSelect
            );
            StudentTableDB.students = queryResult;
        } catch (error) {
            console.error("Error retrieving student data:", error);
            throw new Error("Error retrieving student data");
        }
    }

    static isDataExists(fieldName, comparator) {
        const foundStudent = StudentTableDB.students.find(comparator);
        return !!foundStudent;
    }

    static validateStudentIdExistence(studentId) {
        return StudentTableDB.isDataExists(
            "ID",
            (s) => s.studentId === studentId
        );
    }

    static validateNameExistence(name) {
        return StudentTableDB.isDataExists("name", (s) => s.name === name);
    }

    static validateEmailExistence(email) {
        return StudentTableDB.isDataExists(
            "email",
            (s) => s.email_address === email
        );
    }

    static validateContactExistence(contact) {
        return StudentTableDB.isDataExists(
            "contact",
            (s) => s.contact === contact
        );
    }

    static getStudent(studentId) {
        return StudentTableDB.students.find((s) => s.studentId === studentId);
    }

    static async validatePassword(studentId, password) {
        const student = StudentTableDB.getStudent(studentId);
        if (!student) {
            return false;
        }

        return await this.passwordEncryptor.comparePasswords(
            password,
            student.password
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
            StudentTableDB.sqlInsert,
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
