const mysql = require("mysql");  

//connection settings
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
});

connection.connect((err) => {
    if (err) {
    console.error("connection failed" + err);
    return;
    }

    console.log("Connected to MySQL");
});

//Query
connection.query("CREATE DATABASE cv;", (err, results) => {
    if (err) throw err;

    console.log("Database created: " + results);
});