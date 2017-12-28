var express = require("express");
var ejs = require("ejs");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

//Starts the express framework
var app = express();

//Sets ejs as view engine
app.set("view engine", ejs);

//Sets views
app.set("views", "./app/views");

//Sets static
app.use(express.static("./app/public"));

//Sets body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Sets express-validator
app.use(expressValidator());

//Sets consign to autoload routes, models and controllers to the app
consign()
    .include("./app/routes")
    .then("./app/models")
    .then("./app/controllers")
    .into(app);

//Exports app
module.exports = app;