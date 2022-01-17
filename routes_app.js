const express = require("express");

const router = express.Router();


router.get("/", function(req, res){
  /* Buscar el usuario */
  res.render("app/home")
});


module.exports = router;
