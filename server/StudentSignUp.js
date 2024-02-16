export default class StudentSignUp {
    static QUERY;
    static PASSWORD_ENCRYPTOR;
    static TABLE = "student";

    static initialize(query, passwordEncryptor) {
        StudentSignUp.QUERY = query;
        StudentSignUp.PASSWORD_ENCRYPTOR = passwordEncryptor;
    }

    static async validateUniqueCredentials(details) {
        const { student_id, name, email_address, contact } = details;

        const user = await StudentSignUp.QUERY.getRecord(StudentSignUp.TABLE, {
            student_id: student_id,
            name: name,
            email_address: email_address,
            contact: contact,
        });

        if (user) {
            throw new Error("User with the specified email address already exists");
        }
    }

    static async authenticateUser(email, password) {
        try {
            const hashedPassword = StudentSignUp.PASSWORD_ENCRYPTOR.hashPassword(password);
            const user = await StudentSignUp.QUERY.getRecord(StudentSignUp.TABLE, {
                email_address: email,
                password_hash: hashedPassword,
            });

            return user;
        } catch (error) {
            throw new Error(`Error authenticating user: ${error.message}`);
        }
    }

    static async createStudent(details) {
        try {
            const { student_id, name, email_address, contact, password } = details;
            const hashedPassword = StudentSignUp.PASSWORD_ENCRYPTOR.hashPassword(password);

            const record = {
                student_id: student_id,
                name: name,
                email_address: email_address,
                contact: contact,
                password_hash: hashedPassword,
            };

            const result = await StudentSignUp.QUERY.createRecord(StudentSignUp.TABLE, record);

            return result;
        } catch (error) {
            throw new Error(`Error creating student: ${error.message}`);
        }
    }
}
