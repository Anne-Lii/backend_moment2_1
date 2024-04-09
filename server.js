//Code by: Anne-Lii Hansen

//include express, postgre, cors, dotenv
const express = require("express"); 
const { Client } = require("pg");
const cors = require("cors");
const client = require("./install"); 
 
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());//cross-origin resource sharing for cross-origin requests
app.use(express.json());//middlewear to parse incoming JSON

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
    // error if workexperience is empty
    if (results.rows.length === 0) {
        res.status(404).json({message: "No workingexperiences found"});
    } else {
        res.json(results.rows);
    }
   });
});

//Add workexperience
app.post("/api/work", (req, res) => {
    //variables with all attributes
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

    //validate input and errors
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
    const id = req.params.id;
    const {
        companyname,
        location,
        jobtitle,
        description,
        startdate,
        enddate
    } = req.body;

    // Validate
    if (!companyname || !location || !jobtitle || !description || !startdate || !enddate) {
        return res.status(400).json({
            message: "All attributes must be included",
            https_response: { message: "Bad request", code: 400 }
        });
    }

   // SQL uppdate workexperience in database
    client.query(`
        UPDATE workexperience 
        SET companyname = $1, location = $2, jobtitle = $3, description = $4, startdate = $5, enddate = $6
        WHERE id = $7`, 
        [companyname, location, jobtitle, description, startdate, enddate, id], 
        (err, results) => {
            if (err) {
                console.error("Error updating work experience: ", err);
                return res.status(500).json({ error: "Something went wrong" }); 
            }

            console.log("Query updated: ", results.rows);
        
            res.json({ 
                message: "Work experience updated", 
                work: { id, companyname, location, jobtitle, description, startdate, enddate }
            });
        }
    );
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