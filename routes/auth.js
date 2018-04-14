var express= require("express");
var router=express.Router();
var passport=require("passport");
var User = require("../models/user");


router.get("/",function(req,res){
    res.render("index");
});

// show register form
router.get("/register", function(req, res){
   res.render("register") 
});


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,email:req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error",err.message)
            console.log("Error while regitering");
            return res.render("register");
        }
           passport.authenticate("local")(req, res, function(){
          // req.flash("success","Welcome to Yelp camp " + req.body.username); 
           console.log("successfuly registered");
           res.redirect("/"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

module.exports = router;