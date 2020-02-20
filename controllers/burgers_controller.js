var express = require("express");
var router = express.Router();
var db = require("../models");
var bodyParser = require("body-parser");


router.get("/api/all", function(req,res){
  db.burgers.findAll().then(function(results){
    res.json(results);
  });
});

router.get("/burgers", function(req,res){
  db.burgers.findAll().then(function(data){
    var hbsObject = {burgers : data};
    res.render("index", hbsObject);    
  });
});

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// post route -> back to index
router.post("/burgers/create", function(req,res){
  db.burgers.create({
    burger_name : req.body.burger_name,
    devoured : false
    }).then(function(result){
      console.log(result);
    res.redirect("/burgers");
  });
});


// put route -> back to index
router.put("/burgers/update", function(req,res){
  var eaten = {
    devoured : 1
  }
  db.burgers.update(eaten,{

    where : {
      id : req.body.burger_id
    }
  }).then(function(result){
    console.log(result);
    res.redirect("/");
  });

});
  



module.exports = router;