    var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    
    //edit profile


    router.get("/",function(req,res){
        var UserDetail=require("../models/user_detail");
        var username =req.user.username;
        //res.render("edit_profile",{currentUser: req.user});


        UserDetail.find({username: username}, function(err,result){
            if(err){
                console.log(err);
            }else{
                var output = [];
                output[0] = result[0].firstname ;
                output[1] = result[0].lastname ;
                output[2] = result[0].gender ;
                output[3] = result[0].dob ;
                output[4] = result[0].mobilenumber ;
                output[5] = result[0].address ;
                output[6] = req.user.username;
                
                res.render("viewprofile",{userDetails: output});
            }

    });
});

    

    
    module.exports = router;
