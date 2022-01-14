var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/test");

var userSchemaJSON = {
  email:String,
  password:String
};

var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model("User", user_schema);

app.use("/estatico",express.static('public'));
//app.use(bodyParser.json()); // peticiones con formato application/json
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
