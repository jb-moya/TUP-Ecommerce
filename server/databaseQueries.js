import pool from "./database.js";

class databaseQueries {
    static connection ;

    static async getDBConnection(connection) {
        databaseQueries.connection = connection;
    }

    static async getAllRecords(table) {
        try {
            const query = `SELECT * FROM ${table}`;
            const rows = await databaseQueries.connection.query(query);

            if (rows.length > 0) {
                return rows;
            } else {
                throw new Error(`No records found in the table`);
            }
        } catch (error) {
            throw new Error(`Error fetching records: ${error.message}`);
        }
    }

    static async getRecord(table, primaryKeyValues) {
        try {
            const keyColumns = Object.keys(primaryKeyValues);
            const values = Object.values(primaryKeyValues);

            const whereClause = keyColumns
                .map((column) => {
                    if (primaryKeyValues[column] === null) {
                        return `${column} IS NULL`;
                    } else {
                        return `${column} = ?`;
                    }
                })
                .join(" AND ");

            const query = `SELECT * FROM ${table} WHERE ${whereClause}`;

            const rows = await databaseQueries.connection.query(query, values);

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

    static async updateRecord(table, primaryKeyValues, updateValues) {
        try {
            const keyColumns = Object.keys(primaryKeyValues);
            const keyValues = Object.values(primaryKeyValues);
            const updateColumns = Object.keys(updateValues);
            const updateParams = Object.values(updateValues);

            const setClause = updateColumns
                .map((column) => `${column} = ?`)
                .join(", ");
            const whereClause = keyColumns
                .map((column) => `${column} = ?`)
                .join(" AND ");

            const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
            const values = [...updateParams, ...keyValues];

            const result = await databaseQueries.connection.query(query, values);

            if (result.affectedRows > 0) {
                return result;
            } else {
                throw new Error(
                    `No record updated with the specified key values`
                );
            }
        } catch (error) {
            throw new Error(`Error updating row: ${error.message}`);
        }
    }

    static async deleteRecord(table, primaryKeyValues) {
        try {
            const keyColumns = Object.keys(primaryKeyValues);
            const values = Object.values(primaryKeyValues);

            const whereClause = keyColumns
                .map((column) => `${column} = ?`)
                .join(" AND ");
            const query = `DELETE FROM ${table} WHERE ${whereClause}`;

            const result = await databaseQueries.connection.query(query, values);

            if (result.affectedRows > 0) {
                return result;
            } else {
                throw new Error(
                    `No record deleted with the specified key values`
                );
            }
        } catch (error) {
            throw new Error(`Error deleting row: ${error.message}`);
        }
    }

    static async authenticateUser(email, password) {
        try {
            const user = await databaseQueries.connection.query(
                "SELECT * FROM student WHERE email_address = ? AND password_hash = ?",
                [email, password]
            );

            return user;
        } catch (error) {
            throw new Error(`Error authenticating user: ${error.message}`);
        }
    }

    static async getPrimaryKeys() {
        const primaryKeys = await db.query(
            "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'student' AND COLUMN_KEY = 'PRI';"
        );
        return primaryKeys;
    }

    static async getStudent(studentId) {
        const student = await db.query(
            "SELECT * FROM student WHERE studentId = ?",
            [studentId]
        );
        return student;
    }

    static async getStudentByEmail(email) {
        const student = await db.query(
            "SELECT * FROM student WHERE email_address = ?",
            [email]
        );
        return student;
    }

    static async getStudentByContact(contact) {
        const student = await db.query(
            "SELECT * FROM student WHERE contact = ?",
            [contact]
        );
        return student;
    }

    static async insertStudent(studentId, name, email, contact, password) {
        const response = await db.query(
            "INSERT INTO student (studentId, name, email_address, contact, password) VALUES (?, ?, ?, ?, ?)",
            [studentId, name, email, contact, password]
        );
        return response;
    }

    static async updateStudent(studentId, name, email, contact, password) {
        const response = await db.query(
            "UPDATE student SET name = ?, email_address = ?, contact = ?, password = ? WHERE studentId = ?",
            [name, email, contact, password, studentId]
        );
        return response;
    }

    static async deleteStudent(studentId) {
        const response = await db.query(
            "DELETE FROM student WHERE studentId = ?",
            [studentId]
        );
        return response;
    }
}

export default databaseQueries;
