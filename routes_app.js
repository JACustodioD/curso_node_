const express = require("express");
const Imagen = require("./models/imagenes");

const router = express.Router();


router.get("/", function(req, res){
  res.render("app/home")
});

/* REST */
router.get("/imagenes/new", function(req, res){
  res.render("app/imagenes/new")
});

router.get("/imagenes/:id/edit", function(req, res){

});


router.route("/imagenes/:id")
  .get(function(req, res){
    Imagen.findById(req.params.id, function(err, imagen){
      res.render("app/imagenes/show", {imagen:imagen});
    });
  })
  .put(function(req, res){

  })
  .delete(function(req, res){

  });


  router.route("/imagenes")
    .get(function(req, res){

    })
    .post(function(req, res){
      const data = {
        title: req.body.title
      };

      const imagen = new Imagen(data);

      imagen.save(function(err){
        if(!err){
          res.redirect("/app/imagenes/"+imagen._id);
        }
      })
    });

module.exports = router;
