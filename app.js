var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user").User;

var app = express();

app.use("/estatico",express.static('public'));
app.use(bodyParser.json()); // peticiones con formato application/json
app.use(bodyParser.urlencoded({extended:true})); // falso -> no parsing de arrays
app.set("view engine", "jade");

app.get("/", function(req, res){
  res.render("index");
});

app.get("/login", function(req, res){
  User.find(function(err,doc){
    console.log(doc);
    res.render("login");
  });
});

app.post("/users", function(req, res){
  var user = new User({email: req.body.email, password: req.body.password})
  user.save(function(){
    res.send("guardamos tus datos");
  });
});


app.listen(8080);

// db.createUser({ user: "jacd", pwd: "developer", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})
