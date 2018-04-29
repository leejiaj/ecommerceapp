var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    var objectId= require("mongodb").ObjectID;
    
    router.get("/",function(req,res){
    	var Purchase=require("../models/purchase");
    	var Product=require("../models/product");
    	var username =req.user.username;
   		
    		Purchase.find({username: username}, function(err,result){
    		if(err){
    			console.log(err);
    		}else{
    			var output = [];
    			for(var i=0;i<result.length;i++){
    			 	output.push(objectId(result[i].productid));
    			}
			 	Product.find({"_id": {"$in" : output}},function(err,result1){
					if(err){
						console.log(err);
					}else{
						var output1 = [];
		    			for(var i=0;i<result1.length;i++){
                            for(var j=0;j<result.length;j++){
                                if(objectId(result[j].productid).equals(result1[i]._id)){
                                    var temp1 = [];
                                    temp1.push(result[j].purchaseid);
                                    temp1.push(result[j].purchasedate);
                                    temp1.push(result1[i].productname);
                                    temp1.push(result1[i].price);
                                    temp1.push(result1[i].productimage1);
                                    temp1.push(result[j].orderstatus);
                                    output1.push(temp1);
                                }
                            }
		    			}
		    			res.render("user/MyOrders",{purchaseDetails: output1});
					}
				});
    			 
    			}
    		});        
    });


module.exports = router;