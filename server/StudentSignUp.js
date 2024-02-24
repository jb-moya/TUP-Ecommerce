export default class StudentSignUp {
    static QUERY;
    static CONNECTION;
    static PASSWORD_ENCRYPTOR;
    static TABLE = "student";

    static async getStudentDetails(student_id) {}

    static initialize(query, connection, passwordEncryptor) {
        StudentSignUp.QUERY = query;
        StudentSignUp.CONNECTION = connection;
        StudentSignUp.PASSWORD_ENCRYPTOR = passwordEncryptor;
    }

    static async validateUniqueCredentials(details) {
        const { student_id, name, email_address, contact_number } = details;

        const existingStudentId = {
            student_id: student_id,
            name: name,
            email_address: email_address,
            contact_number: contact_number,
        };

        const keysColumns = Object.keys(existingStudentId);
        const values = Object.values(existingStudentId);

        const whereClause = keysColumns
            .map((column) => {
                if (existingStudentId[column] === null) {
                    return `${column} IS NULL`;
                } else {
                    return `${column} = ?`;
                }
            })
            .join(" OR ");

        const query = `SELECT * FROM ${StudentSignUp.TABLE} WHERE ${whereClause}`;

        const existingUser = await StudentSignUp.CONNECTION.query(
            query,
            values
        );

        console.log("existingUser: ", existingUser);

        if (!existingUser || existingUser.length === 0) {
            return;
        }

        for (const key in details) {
            if (details.hasOwnProperty(key)) {
                if (existingUser.some((user) => user[key] === details[key])) {
                    throw new Error(`${key}: ${details[key]} already exists`);
                }
            }
        }
    }

    static async authenticateUser(email, password) {
        try {
            const hashedPassword =
                StudentSignUp.PASSWORD_ENCRYPTOR.hashPassword(password);
            const user = await StudentSignUp.QUERY.getRecord(
                StudentSignUp.TABLE,
                {
                    email_address: email,
                    password_hash: hashedPassword,
                }
            );

            return user;
        } catch (error) {
            throw new Error(`Error authenticating user: ${error.message}`);
        }
    }

    static async createStudent(details) {
        const { student_id, name, email_address, contact_number, password } =
            details;

        try {
            console.log("contact_number: ", contact_number);

            const hashedPassword =
                await StudentSignUp.PASSWORD_ENCRYPTOR.hashPassword(password);

            console.log("detailsssss: ", details);

            console.log("after defatils contact_number: ", contact_number);

            const record = {
                student_id: student_id,
                name: name,
                email_address: email_address,
                contact_number: contact_number,
                password_hash: hashedPassword,
            };

            console.log("record: ", record);

            const result = await StudentSignUp.QUERY.createRecord(
                StudentSignUp.TABLE,
                record
            );
            console.log("result: ", result);

            return result;
        } catch (error) {
            console.log("error: ", error);
            throw new Error(`Error creating student: ${error.message}`);
        }
    }
}
