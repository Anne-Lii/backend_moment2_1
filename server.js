const express = require("express");
const app = express();
const port = process.env.DB_PORT || 3000;

//Routing
app.get("/api", (req, res) => {
    res.json({message: " Välkommen till mitt API"})
});


app.listen(port, () => {
    console.log("Server is running on port: "+ port)
});