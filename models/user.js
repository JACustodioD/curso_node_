var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/test");

var posibles_valores = ["M", "F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];

var  password_validation = {
  validator: function(pass){
    return this.password_confirmation == pass;
  },
  message: "Las contraseñas no son iguales"
};

var user_schema = new Schema({
  name: String,
  last_name: String,
  username: {
    type:String,
    required:"El username es requerido",
    maxlength:[50, "El username no puede ser mayor a 50"]
  },
  password: {
    type:String,
    required:"El password es obligatorio",
    minlength:[8, "La contraseña debe tener al menos 8 digitos"],
    validate: password_validation
  },
  age: {
    type:Number,
    min:[5, "La edad no puede ser menor que 5"],
    max:[100, "La edad no puede ser mayor que 100"]
  },
  email: {type:String, required:"El correo es obligatorio", match:email_match},
  date_of_birth: Date,
  sex: {type:String, enum:{values:posibles_valores, message:"Opcion no valida"}}
});


user_schema.virtual("password_confirmation").get(function(){
  return this.password_conf;
}).set(function(password){
  this.password_conf = password;
});

var User = mongoose.model("User", user_schema);


module.exports.User = User;
