var express= require("express");
var router=express.Router();
var passport=require("passport");
var User = require("../models/user");
var Product=require("../models/product");
var middleware=require("../middleware");


/*Show all campgrounds. Show index page*/
router.get("/",middleware.checkOwnership,function(req,res){
    Product.find({},function(err,prods){
    if(err)
    {
        req.flash("error","Oops! Something went wrong!");
        console.log("Error while finding the products");
    }
    else
    {
        res.render("admin/index",{prods:prods});
    }
});
});
router.get("/add",function(req,res){
    res.render("admin/new");
});

/**Post route for Add a new product*/
router.post("/add",middleware.checkOwnership,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.imageURL;
    var desc=req.body.desc;
    var newProduct={name:name, image:image,description:desc,price:price};
    Product.create(newProduct,function(err,newProd){
        if(err){
            console.log("Error while adding the new Product");
        }
        else{
             //req.flash("success","Successfully added a new product");
             console.log("Added new item successfully");
              res.redirect("/");
        }
    });

    });
/*Delete route for deleting a campground*/
router.delete("/:id",middleware.checkOwnership,function(req,res){
    console.log("Reached here");
    Product.findByIdAndRemove(req.params.id,function(err,deletedCamp){
        if(err)
        {
            res.redirect("/admin");
        }
        else{
            req.flash("success","Successfully deleted the campground")
            res.redirect("/admin");
        }
    })
});


module.exports = router;