import express from "express";
import mysql from "mysql";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "!Bvh3rtr0j0",
    database: "tupcommerce",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
});

export default connection;