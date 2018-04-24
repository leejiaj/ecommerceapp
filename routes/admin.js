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
    var newProduct={productname:name, productimage1:image,description:desc,price:price};
    Product.create(newProduct,function(err,newProd){
        if(err){
            console.log("Error while adding the new Product");
        }
        else{
             //req.flash("success","Successfully added a new product");
             console.log("Added new item successfully");

              
              res.redirect("/admin/");

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



/*Edit an existing campground*/
router.get("/:id/edit",middleware.checkOwnership,function(req,res){
    Product.findById(req.params.id,function(err,foundProd){
        if(err)
        {
            req.flash("error","Oops! Something went wrong!");
            return res.redirect("/admin");
        }
        else
        {
            res.render("admin/edit",{foundProd:foundProd});
        }
    });
});

/*Post route for editing a campground*/
router.put("/:id",function(req,res)
{   
     console.log(req.body.name);
     var newData={name:req.body.name,image:req.body.imageURL,price:req.body.price,description:req.body.desc};
     Product.findByIdAndUpdate(req.params.id,{$set:newData},function(err,updatedCamp){
        if(err)
        {
            res.redirect("/admin")
        }
        else
        {
            req.flash("success","Successfully updated the product")
            res.redirect("/admin/");
        }
    });
     
    
});

module.exports = router;