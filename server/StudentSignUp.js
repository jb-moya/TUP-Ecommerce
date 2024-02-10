export default class StudentSignUp {
    static query;
    static passwordEncryptor;
    static table = "student";

    static initialize(query, passwordEncryptor) {
        StudentSignUp.query = query;
        StudentSignUp.passwordEncryptor = passwordEncryptor;
    }

    static async validateUniqueCredentials(details) {
        const { student_id, name, email_address, contact } = details;

        const user = await StudentSignUp.query.getRecord(table, {
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
            const hashedPassword = StudentSignUp.passwordEncryptor.hashPassword(password);
            const user = await StudentSignUp.query.getRecord(table, {
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
            const hashedPassword = StudentSignUp.passwordEncryptor.hashPassword(password);

            const record = {
                student_id: student_id,
                name: name,
                email_address: email_address,
                contact: contact,
                password_hash: hashedPassword,
            };

            const result = await StudentSignUp.query.createRecord(table, record);

            return result;
        } catch (error) {
            throw new Error(`Error creating student: ${error.message}`);
        }
    }
}
