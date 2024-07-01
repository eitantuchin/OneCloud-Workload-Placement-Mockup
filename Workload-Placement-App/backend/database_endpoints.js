const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
var bodyParser = require("body-parser");
const url = ""; // Mongo server link here for the database
const client = new MongoClient(url);
const db = client.db(""); // The actual db here

var app= express();
app.use(cors());
app.use(bodyParser.json());

var port = "8081";
app.listen(port, () => {
    console.log("App listening at http://localhost:%s", port);
});

