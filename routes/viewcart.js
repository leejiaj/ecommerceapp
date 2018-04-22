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
    	//var produtId ="5adbc5e1aa30d630c8349cf8";

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
		    				temp1.push(result1[i].name);
							temp1.push(result1[i].price);
							temp1.push(result1[i].image);
		    			 	output1.push(temp1);
		    			}
		    			//console.log(output1[0][0]);
		    			res.render("shopping_cart",{productDetails: output1});
					}
				});
    			 
    			}
    		});        
    });


module.exports = router;