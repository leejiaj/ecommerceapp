var express= require("express");
var router=express.Router();
var passport=require("passport");
var User = require("../models/user");
var Product = require("../models/product");
var textSearch = require('mongoose-text-search');

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
    if(req.body.secretCode==="YabbaDabbaDoo"){
        newUser.isAdmin=true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error",err.message)
            console.log("in auth");
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

//getting data from mongodb for AJAX call
router.post("/grab",function(req,res){
    User.find({$or:[{username:req.body.name},{email:req.body.email}]},function(err,users){
        if(err)
        {
            console.log("Error occured while getting data from db")
        }
        else
        {
            console.log(users)
            res.send(users);
        }
    })
})


router.post("/search",function(req,res){
    console.log(req.body.srchterm);
    /*Product.textSearch(req.body.srchterm,function(err,output){
        console.log("otupt", output);
        res.send(output);
    })*/
    Product.find({$text: {$search: req.body.srchterm}},function(err,found){
        console.log(found);
        res.render("product/index",{products: found, currentUser: req.user})
    })
})

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
        
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","You have been successfully logged out!! Stay in touch.")
   res.redirect("/");
});

module.exports = router;