import mysql from "mysql2";
import dotenv from "dotenv";
import util from "util";
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused.");
        }
    }

    if (connection) connection.release();

    return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

// example query
const rows = await pool.query("SELECT 1 + 1 AS solution");
console.log(rows[0].solution);

export default pool;