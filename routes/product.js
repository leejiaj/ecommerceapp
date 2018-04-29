var express    = require("express");
var router     = express.Router();
var Product    = require("../models/product");
var Cart       = require("../models/cart");
var Review     = require("../models/review");
var middleware = require("../middleware");
var User 	   = require("../models/user");

// INDEX -- view all products, GET route
router.get("/", function (req, res) {
    // get all products data from Datebase
    Product.find({}, function (err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            res.render("product/index", {products: allProducts, currentUser: req.user});
        }
    });
});

// SHOW -- display info about a specific product, GET route
router.get("/:id", function (req, res) {
    // find the product with provided ID
    console.log(req.params.id);
    Product.findOne({_id:req.params.id}).exec(function (err, foundProduct) {
        if (err) {
            console.log(err);
        } else {
            // render the show template with the foundProduct
            Review.find({productid:req.params.id}, function (err, allReviews) {
            if (err) {
                    console.log(err);
                    res.render("product/show", {product: foundProduct, currentUser: req.user});
                } else {
                    res.render("product/show", {product: foundProduct, reviews: allReviews, currentUser: req.user});
                }
            });
            
        }
    });
});

// add to cart, POST route 
router.post("/:id", middleware.isLoggedIn, function (req, res) {

    var username =req.user.username;
    var productid = req.params.id;
    var newCart = {username: username, productid:productid};
    
    // create a new cart and save it to the Database
    Cart.create(newCart, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect to the product route

            res.redirect("/product/" + req.params.id);
        }
    });
});

// add to review, POST route 
router.post("/:id/addreview", middleware.isLoggedIn, function (req, res) {

    var username =req.user.username;
    var productid = req.params.id;
    var reviewtext = req.body.review;
    var newReview = {productid: productid, reviewtext:reviewtext, username:username};
    
    // create a new cart and save it to the Database
    Review.create(newReview, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect to the product route

            res.redirect("/product/" + req.params.id);
        }
    });
});


// export the router module
module.exports = router;