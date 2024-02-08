import mysql from "mysql2";
import dotenv from "dotenv";
import util from "util";
import databaseQueries from "./databaseQueries.js";
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

// pool.query("SELECT * FROM student", (err, rows) => {
//     console.log("rows:: ", rows);
// });

// Inserting data into the shop table
// const query = `
//     INSERT INTO shop (shop_name, email_address, contact_number)
//     VALUES (?, ?, ?)
//   `;

// const values = ["Your Shop Name", "shop@example.com", "123456789"]; // Replace these values with your actual data

// const result = await pool.execute(query, values);
// testing the databaseQueries class
// testing the databaseQueries class
// testing the databaseQueries class
// testing the databaseQueries class
const exampleQueries = new databaseQueries(pool);
const record = await exampleQueries.getRecord("student", {
    student_id: "tupm-21-1664",
});

const recordStock = await exampleQueries.getRecord("stock", {
    shop_id: "1",
    // product_id: "1",
});

console.log("record:: ", record);
console.log("recordStock:: ", recordStock);

export default pool;