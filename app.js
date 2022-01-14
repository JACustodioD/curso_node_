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
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation
  });
  console.log(user.password_confirmation);
  user.save(function(err){
    if(err){
      console.log(String(err));
    }
    res.send("guardamos tus datos");
  });
});


app.listen(8080);
