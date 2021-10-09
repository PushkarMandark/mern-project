// using express to create servers
const express = require("express");
const app = express();

// node middleware to accept/send json data from get method or send data as json
app.use(express.json());

//Route imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

//exporting app module so can be used in server
module.exports = app;
