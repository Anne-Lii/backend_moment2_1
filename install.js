const { Client } = require("pg");     //include postgre
require("dotenv").config();         //include dotenv file

//connection settings
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

//connect to database
client.connect((err) => {
    if (err) {
        console.error("connection failed" + err);
        return;
    }
    console.log("Connected to Postgre database");
});

//create table
client.query(`
        CREATE TABLE IF NOT EXISTS workexperience (

        id                  SERIAL PRIMARY KEY,
        companyname         VARCHAR(50) NOT NULL,
        location            VARCHAR(50) NOT NULL,
        jobtitle            VARCHAR(50),
        description         VARCHAR(1000),
        startdate           DATE NOT NULL,
        enddate             DATE 
    )`, (err, res) => {
        
    if (err) {
        console.error(" Error in query execution: " + err)
        return;
    }
    console.log("Table workexperience created");
});

module.exports = client;  //export client