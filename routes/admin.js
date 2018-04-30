var express= require("express");
var router=express.Router();
var passport=require("passport");
var User = require("../models/user");
var Product=require("../models/product");
var Section=require("../models/section");
var middleware=require("../middleware");
var multer = require('multer');

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'preetidurai', 
  api_key: "331575443724313", 
  api_secret: "ZJ-lQhbDbaQLwOp4BbIq0BweRyM"
});


/*Show all products. Show index page*/
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
router.get("/add",middleware.checkOwnership,function(req,res){
    
    res.render("admin/new");
});

/**Post route for Add a new product*/
router.post("/add",middleware.checkOwnership,upload.single('image'),function(req,res){
    cloudinary.v2.uploader.upload(req.file.path, function(err,result){
        if(err)
        {
            console.log("Eror");
            res.redirec("/admin");
        }
        // add cloudinary url for the image to the product object under image property
       req.body.imageURL = result.secure_url;
       req.body.imageId = result.public_id;
       var name=req.body.name;
    var price=req.body.price;
    var image=req.body.imageURL;
    var imageId=req.body.imageId ;
    var desc=req.body.desc;
    var newProduct={stockavailable:"Available",productname:name, productimage1:image,description:desc,price:price,category:req.body.category,section:req.body.section,imageId:imageId};
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
    
    
    

    });
/*Delete route for deleting a product*/
router.delete("/:id",middleware.checkOwnership,function(req,res){
    console.log("Reached here");
    Product.findByIdAndRemove(req.params.id,function(err,deletedCamp){
        if(err)
        {
            res.redirect("/admin");
        }
        else{
            req.flash("success","Successfully deleted the product")
            res.redirect("/admin");
        }
    })
});



/*Edit an existing product*/
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


router.put("/:id", middleware.checkOwnership,upload.single('image'), function(req, res){
    Product.findById( req.params.id, async function(err, pdt){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (req.file) {
              try {
                  await cloudinary.v2.uploader.destroy(pdt.imageId);
                  var result = await cloudinary.v2.uploader.upload(req.file.path);
                  pdt.imageId = result.public_id;
                  pdt.productimage1 = result.secure_url;
              } catch(err) {
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            }
            pdt.productname = req.body.name;
            pdt.description = req.body.description;
            pdt.save();
            req.flash("success","Successfully Updated!");
            res.redirect("/admin");
        }
    });
});


/*Post route for editing a product*/
/*
router.put("/:id",middleware.checkOwnership,upload.single('image'),function(req,res)
{   
        var newData={name:req.body.name,productimage1:image,price:req.body.price,description:req.body.desc};
        Product.findById(req.params.id,{$set:newData},function(err,product){
        if(err)
        {
            res.redirect("/admin")
        }
        else
        {
            if (req.file)
            {
                try {
                  await cloudinary.v2.uploader.destroy(product.imageId);
                  var result = await cloudinary.v2.uploader.upload(req.file.path);
                  product.imageId = result.public_id;
                  product.image = result.secure_url;
              } catch(err) {
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            }
            
            
            
            req.flash("success","Successfully updated the product hre")
            res.redirect("/admin/");
        }
     
         });
});*/
     //console.log(req.body.name);
   /*  else
     {
         newData={name:req.body.name,price:req.body.price,description:req.body.desc};
     
     
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
     }
     
    
});*/

//getting data from mongodb for AJAX call
router.post("/grab",function(req,res){
    Section.findOne({name:req.body.name},'categories',function(err,cats){
        if(err)
        {
            console.log("Error occured while getting data from db")
        }
        else
        {
            res.send(cats);
        }
    })
})

module.exports = router;