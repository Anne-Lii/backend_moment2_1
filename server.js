const express = require("express");  
const cors = require("cors");     
 

const app = express();                                             
const port = 3000; 

app.use(cors());
app.use(express.json());

//Routing
//Get workexperience
app.get("/api", (req, res) => {
    res.json({message: " Välkommen till mitt API"})
});

app.get("/api/work", (req, res) => {
    res.json({message: " get work"});
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

    //validering av input och felmeddelanden
    if(!companyname || !location || !jobtitle || !description || !startdate || !enddate) {
       
        res.status(400).json({error: "You need to fill in all six requirements"});
        return;
    }

    let work = {
        companyname,
        location,
        jobtitle,
        description,
        startdate,
        enddate 
    };

    res.json({message: "Work added", work});
});

//Update workexperience
app.put("/api/work/:id", (req, res) => {
    res.json({message: "Work updated: " + req.params.id});
});

//Delete workexperience
app.delete("/api/work/:id", (req, res) => {
    res.json({message: "Work deleted: " + req.params.id});
});

//start app
app.listen(port, () => {
    console.log("Server is running on port: "+ port)
});