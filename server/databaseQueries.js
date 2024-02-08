class databaseQueries {
    constructor(connection) {
        this.connection = connection;
    }

    async getRecord(table, primaryKeyValues) {
        try {
            const keyColumns = Object.keys(primaryKeyValues);
            const values = Object.values(primaryKeyValues);

            const whereClause = keyColumns
                .map((column) => `${column} = ?`)
                .join(" AND ");

            const query = `SELECT * FROM ${table} WHERE ${whereClause}`;

            const rows = await this.connection.query(query, values);

            if (rows.length > 0) {
                return rows;
            } else {
                throw new Error(
                    `No record found with the specified composite key values`
                );
            }
        } catch (error) {
            throw new Error(`Error fetching row: ${error.message}`);
        }
    }

    async getPrimaryKeys() {
        const primaryKeys = await this.db.query(
            "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'student' AND COLUMN_KEY = 'PRI';"
        );
        return primaryKeys;
    }

    async getStudent(studentId) {
        const student = await this.db.query(
            "SELECT * FROM student WHERE studentId = ?",
            [studentId]
        );
        return student;
    }

    async getStudentByEmail(email) {
        const student = await this.db.query(
            "SELECT * FROM student WHERE email_address = ?",
            [email]
        );
        return student;
    }

    async getStudentByContact(contact) {
        const student = await this.db.query(
            "SELECT * FROM student WHERE contact = ?",
            [contact]
        );
        return student;
    }

    async insertStudent(studentId, name, email, contact, password) {
        const response = await this.db.query(
            "INSERT INTO student (studentId, name, email_address, contact, password) VALUES (?, ?, ?, ?, ?)",
            [studentId, name, email, contact, password]
        );
        return response;
    }

    async updateStudent(studentId, name, email, contact, password) {
        const response = await this.db.query(
            "UPDATE student SET name = ?, email_address = ?, contact = ?, password = ? WHERE studentId = ?",
            [name, email, contact, password, studentId]
        );
        return response;
    }

    async deleteStudent(studentId) {
        const response = await this.db.query(
            "DELETE FROM student WHERE studentId = ?",
            [studentId]
        );
        return response;
    }
}

export default databaseQueries;
