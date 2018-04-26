var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    var objectId= require("mongodb").ObjectID;
    
    //edit profile


    router.get("/",function(req,res){
    	res.redirect("/OrderDetails");
    });


router.post("/",function(req,res){
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        }
        var purchaseid = getRandomIntInclusive(100000,900000);
        var username=req.user.username;
        var total = req.body.totalprice;
        var date = (new Date()).toLocaleDateString();
        var address = req.body.address;
        var OrderDetail=require("../models/purchase");
        var status="Confirmed";

        var newDetails= {
            purchaseid:purchaseid,
            username:username,
            //productid:String,
            purchasedate:date,
            purchaseamount:total,
            shippingaddress: address,
            orderstatus: status
        };

                 
        OrderDetail.create(newDetails, function(err,newlyCreated){
                    if(err){
                        console.log(err);
                    }else{
                        res.render("success",{orderNumber:purchaseid});
                    }
                });

    });

module.exports = router;