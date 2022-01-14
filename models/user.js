var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/test");

var user_schema = new Schema({
  name: String,
  username: String,
  password: String,
  age: Number,
  email: String,
  date_of_birth: Date
});


user_schema.virtual("password_confirmation").get(function(){
  return this.password_conf;
}).set(function(password){
  this.password_conf = password;
});

var User = mongoose.model("User", user_schema);


module.exports.User = User;
