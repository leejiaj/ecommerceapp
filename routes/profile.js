    var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    
    //edit profile


    router.get("/",function(req,res){
        res.render("edit_profile",{currentUser: req.user});
    });

    var User = require("../models/user");

    router.post("/",function(req,res){
        var username= req.body.username;
        var firstname= req.body.fname;
        var lastname= req.body.lname;
        //var gender = req.body.gender;
        //var dob= req.body.dob;
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

        /*UserDetail.find({username: username}, function(err,result){
            if(err){
                    console.log("Error while finding");
                }

            else if(result.length>0){
                UserDetail.update({$set:newDetails},function(err,result){
                    if(err){
                        console.log("Error while updating");
                    }else{
                        res.redirect("/edit_profile");
                    }
                });
                    
            }else{
                UserDetail.create(newDetails, function(err,newlyCreated){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect("/edit_profile");
                    }
                });
            }
            
        });*/

    });
    module.exports = router;
