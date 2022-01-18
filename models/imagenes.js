const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const img_schema = new Schema({
  title:{type:String, required:true}
});

const Imagen = mongoose.model("Imagen", img_schema);

module.exports = Imagen;
