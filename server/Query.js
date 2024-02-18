export default class Query {
    static connection;

    static async getDBConnection(connection) {
        Query.connection = connection;
    }

    static async getAllRecords(table) {
        try {
            const query = `SELECT * FROM ${table}`;
            const rows = await Query.connection.query(query);

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
                .join(" OR ");

            const query = `SELECT * FROM ${table} WHERE ${whereClause}`;

            const rows = await Query.connection.query(query, values);

            if (rows.length > 0) {
                return rows;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Error fetching row: ${error.message}`);
        }
    }

    static async createRecord(table, record) {
        // console.log("record", record);

        const columns = Object.keys(record);
        const values = Object.values(record);

        // console.log("columns", columns);
        console.log("values", values);
        console.log("values", [values]);

        const placeholders = values.join(", ");

        // console.log("placeholders", placeholders);

        const query = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (?)`;

        // console.log(query);
        console.log(query);

        await Query.connection.query(query, [values], (err, res) => {
            if (err) {
                throw new Error(`Error inserting row: ${err.message}`);
            }

            return record;
        });
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

            const result = await Query.connection.query(query, values);

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

            const result = await Query.connection.query(query, values);

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
}
