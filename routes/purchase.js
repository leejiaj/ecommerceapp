var express= require("express");
    var router=express.Router();
    var passport=require("passport");
    var User = require("../models/user");
    var objectId= require("mongodb").ObjectID;
    
    //edit profile


    router.get("/",function(req,res){
    	var Purchase=require("../models/purchase");
    	var Product=require("../models/product");
    	var username =req.user.username;
   		var produtId=[];


    		Purchase.find({username: username}, function(err,result){
    		if(err){
    			console.log(err);
    		}else{
                 //console.log(result.length);
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
                            for(var j=0;j<result.length;j++){
                                //console.log("Product Id:"+result[j].productid);
                                //console.log("Id:"+result1[i]._id);
                                if(objectId(result[j].productid).equals(result1[i]._id)){
                                    
                                    var temp1 = [];
                                    temp1.push(result[j].purchaseid);
                                    temp1.push(result[j].purchasedate);
                                    temp1.push(result[j].purchaseamount);
                                    temp1.push(result1[i].productname);
                                    //temp1.push(result1[i].price);
                                    temp1.push(result1[i].productimage1);
                                    
                                    output1.push(temp1);
                                }
                            }
		    			}
		    			console.log(output1[0][0]);
		    			res.render("MyOrders",{purchaseDetails: output1});
					}
				});
    			 
    			}
    		});        
    });


module.exports = router;