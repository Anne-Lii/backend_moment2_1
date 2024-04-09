const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

//connects to database
client.connect((err) => {
    if (err) {
        console.error("connection failed" + err);
        return;
    }

    console.log("Connected to Postgre database");
});

//Routing

app.get("/api", (req, res) => {
    res.json({ message: " Välkommen till mitt API" })
});

//Get workexperience
app.get("/api/work", (req, res) => {
   client.query(`SELECT * FROM workexperience;`, (err, results) => {
    if (err) {
        console.error("Error fetching work experiences: " + err);
        return res.status(500).json({error: "something went wrong: " + err});
        
    }

    if (results.rows.length === 0) {
        res.status(404).json({message: "No workingexperiences found"});
    } else {
        res.json(results.rows);
    }
   });
});

//Add workexperience
app.post("/api/work", (req, res) => {

    let {
        companyname,
        location,
        jobtitle,
        description,
        startdate,
        enddate
    } = req.body;

    //error handling
    let errors = {
        message:"",
        details: "",
        https_response: {

}
    };

    //validering av input och felmeddelanden
    if (!companyname || !location || !jobtitle || !description || !startdate || !enddate) {

        //error messages
        errors.message = "All attribute must be included";
        errors.details = "Must include all attributes in JSON";

        //response code
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
        return;
    }

    //add workexp to database
    client.query(`
    INSERT INTO workexperience(companyname, location, jobtitle, description, startdate, enddate)VALUES($1, $2, $3, $4, $5, $6)`, 
    [companyname, location, jobtitle, description, startdate, enddate], (err, results) => {
        if (err) {
            console.error("Error fetching work experiences: " + err);
            return res.status(500).json({error: "something went wrong: " + err});            
        }

        console.log("Query created: " + results);

        let work = {
            companyname,
            location,
            jobtitle,
            description,
            startdate,
            enddate
        };
    
        res.json({ message: "Work added", work });
    });

});

//Update workexperience
app.put("/api/work/:id", (req, res) => {
    res.json({ message: "Work updated: " + req.params.id });
});

//Delete workexperience
app.delete("/api/work/:id", (req, res) => {
    const id = req.params.id;

    //SQL query to delete workexperience
    client.query(`
    DELETE FROM workexperience where ID=$1
    `, [id], (err, results) => {
        if (err) {
            console.error("Error deleting work experience: ", err);
            return res.status(500).json({ error: "Something went wrong" }); 
        }
    });

    res.json({ message: "Work experience deleted: " + id });
});

//start app
app.listen(port, () => {
    console.log("Server is running on port: " + port)
});