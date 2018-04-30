    var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    
    //edit profile

    router.get("/",function(req,res){
        res.render("user/edit_profile",{currentUser: req.user});
    });

    var User = require("../models/user");

    router.post("/",function(req,res){
        var username= req.user.username;
        var firstname= req.body.fname;
        var lastname= req.body.lname;
        var mnumber = req.body.mnumber;
        var address= req.body.address;

        var newDetails= {
            username: username,
            firstname: firstname,
            lastname: lastname,
            mobilenumber: mnumber,
            address: address
        };

        User.update({$set:newDetails},function(err,result){
                    if(err){
                        console.log("Error while updating");
                    }else{
                        res.redirect("/edit_profile");
                    }
                });       
    });
    module.exports = router;
