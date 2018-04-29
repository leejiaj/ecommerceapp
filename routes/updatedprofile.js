    var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    
    //edit profile


    router.get("/",function(req,res){
        var User=require("../models/user");
        var username =req.user.username;
        //res.render("edit_profile",{currentUser: req.user});


        User.find({username: username}, function(err,result){
            if(err){
                console.log(err);
            }else{
                var output = [];
                output[0] = result[0].firstname ;
                output[1] = result[0].lastname ;
                //output[2] = result[0].gender ;
                //output[3] = result[0].dob ;
                output[2] = result[0].mobilenumber ;
                output[3] = result[0].address ;
                output[4] = req.user.username;
                
                res.render("user/viewprofile",{userDetails: output});
            }

    });
});

    

    
    module.exports = router;
