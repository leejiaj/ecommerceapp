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
		    			//console.log(output1[0][0]);
                        var totalprice =0;
                        for (var i=0;i<result1.length;i++){
                            totalprice += parseFloat(result1[i].price); 
                        }
		    			res.render("shopping_cart",{productDetails: output1,totalPrice: totalprice });
					}
				});
    			 
    			}
    		});        
    });


router.post("/",function(req,res){
        //var purchaseid = Math.random();
        var username=req.user.username;
        var total = req.body.totalprice;
        //var date = (new Date()).toLocaleDateString();

        
        
         res.render("orderdetails",{totalPrice:total});
                 
        /*var productid:String,
        var purchasedate:String,
        var purchaseamount:String,
        var shippingaddress: String

        var username= 
        var firstname= req.body.fname;
        var lastname= req.body.lname;
        var gender = req.body.gender;
        var dob= req.body.dob;
        var mnumber = req.body.mnumber;
        var address= req.body.address;

        var newDetails= {
            username: username,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob,
            mobilenumber: mnumber,
            address: address
        };

       

        UserDetail.find({username: username}, function(err,result){
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