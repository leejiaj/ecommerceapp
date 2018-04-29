var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    var objectId= require("mongodb").ObjectID;
    
    //edit profile


    router.get("/",function(req,res){
    	var ViewCart=require("../models/cart");
    	var Product=require("../models/product");
    	var username =req.user.username;
   		var produtId=[];
    	

    		ViewCart.find({username: username}, function(err,result){
    		if(err){
    			console.log(err);
    		}else{
    			var output = [];
    			for(var i=0;i<result.length;i++){
    			 	//produtId.push(result[i].productid);
    			 	output.push(objectId(result[i].productid));
    			}

			 	Product.find({"_id": {"$in" : output}},function(err,result1){
					if(err){
						console.log(err);
					}else{
						var output1 = [];
		    			for(var i=0;i<result1.length;i++){
		    				var temp1 = [];
		    				temp1.push(result1[i].productname);
							temp1.push(result1[i].price);
							temp1.push(result1[i].productimage1);
                            temp1.push(result1[i]._id);
		    			 	output1.push(temp1);
		    			}
                        var totalprice =0;
                        for (var i=0;i<result1.length;i++){
                            totalprice += parseFloat(result1[i].price); 
                        }
		    			res.render("user/shopping_cart",{productDetails: output1,totalPrice: totalprice });
					}
				});
    			 
    			}
    		});        
    });

 router.get("/:id",function(req,res){
    var id = req.params.id; 
    
    var ViewCart=require("../models/cart");

    ViewCart.remove({productid: id},function(err,result){
        if(err){
            console.log(err);
        }else{
            var Product=require("../models/product");
            var username =req.user.username;
            var produtId=[];
        

            ViewCart.find({username: username}, function(err,result){
                if(err){
                    console.log(err);
                }else{
                    var output = [];
                    for(var i=0;i<result.length;i++){
                        //produtId.push(result[i].productid);
                        output.push(objectId(result[i].productid));
                    }

                    Product.find({"_id": {"$in" : output}},function(err,result1){
                        if(err){
                            console.log(err);
                        }else{
                            var output1 = [];
                            for(var i=0;i<result1.length;i++){
                                var temp1 = [];
                                temp1.push(result1[i].productname);
                                temp1.push(result1[i].price);
                                temp1.push(result1[i].productimage1);
                                temp1.push(result1[i]._id);
                                output1.push(temp1);
                            }
                        
                            var totalprice =0;
                            for (var i=0;i<result1.length;i++){
                                totalprice += parseFloat(result1[i].price); 
                            }
                            res.render("user/shopping_cart",{productDetails: output1,totalPrice: totalprice });
                        }
                    });
                 
                }
            });        
        }
    });
});
router.post("/",function(req,res){
        var username=req.user.username;
        var total = req.body.totalprice;
        var User = require("../models/user");

        User.find({username: username}, function(err,result){
            if(err){
                    console.log("Error while finding");
                }else{
                    
                    res.render("user/orderdetails",{totalPrice:total,firstName:result[0].firstname,lastName:result[0].lastname,mno:result[0].mobilenumber,address:result[0].address});
                }
         
        });     

    });

module.exports = router;