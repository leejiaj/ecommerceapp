var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    var objectId= require("mongodb").ObjectID;
    
    //edit profile


    router.get("/",function(req,res){
    	res.redirect("/user/OrderDetails");
    });


router.post("/",function(req,res){
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        }
        var purchaseid = getRandomIntInclusive(100000,900000);
        var username=req.user.username;
        //var total = req.body.totalprice;
        var date = (new Date()).toLocaleDateString();
        var mno=req.body.mnumber;
        var address = req.body.address;
        var OrderDetail=require("../models/purchase");
        var ViewCart=require("../models/cart");
        var status="Confirmed";

        

        ViewCart.find({username: username}, function(err,result){
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<result.length;i++){
                    
                    var newDetails= {
                        purchaseid:purchaseid,
                        username:username,
                        purchasedate:date,
                        mobilenumber:mno,
                        shippingaddress: address,
                        orderstatus: status,
                        productid: result[i].productid,
                    }

                    OrderDetail.create(newDetails, function(err,newlyCreated){
                        if(err){
                            console.log(err);
                        }else{
                            ViewCart.remove({username: username},function(err,result2){
                                if(err){
                                    console.log(err);
                                }
                            });
                        
                        }
                    });   
                }
                
                res.render("user/success",{orderNumber:purchaseid});    
            }
        });
    });

module.exports = router;