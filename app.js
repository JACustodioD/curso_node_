const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user").User;
const session = require("express-session");
const router_app = require("./routes_app");
const session_middleware = require("./middlewares/session");
const app = express();

app.use("/estatico",express.static('public'));
app.use(bodyParser.json()); // peticiones con formato application/json
app.use(bodyParser.urlencoded({extended:true})); // falso -> no parsing de arrays
app.set("view engine", "jade");
app.use(session({
  secret: '12xv3e5da4748aEAsda54w3csda',
  resave: false,
  saveUninitialized: false
}));

/* /app */
app.use("/app", session_middleware);
app.use("/app", router_app);

/* / */
app.get("/", function(req, res){
  res.render("index");
});

app.get("/signup", function(req, res){
  User.find(function(err,doc){
    console.log(doc);
    res.render("signup");
  });
});

app.get("/login", function(req, res){
  console.log(req.session.user_id);
  res.render("login");
});

app.post("/users", function(req, res){
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation
  });
  user.save().then(function(){
    res.send("Se creo el usuario de forma exitosa");
  }, function(err){
    if(err){
      console.log(String(err));
      res.send("No se pudo generar el usuario");
    }
  });
});

app.post('/sessions', function(req, res){
  User.findOne({email:req.body.email, password:req.body.password}, function(err,user){
    req.session.user_id = user._id;
    res.redirect("/app");
  });


});


app.listen(8080);
