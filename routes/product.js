var express    = require("express");
var router     = express.Router();
var Product    = require("../models/product");
var Cart       = require("../models/cart");
var middleware = require("../middleware");

// INDEX -- view all products, GET route
router.get("/", function (req, res) {
    // get all products data from Datebase
    Product.find({}, function (err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            console.log(allProducts);
            res.render("product/index", {products: allProducts, currentUser: req.user});
        }
    });
});

// SHOW -- display info about a specific product, GET route
router.get("/:id", function (req, res) {
    // find the product with provided ID
    console.log(req.params.id);
    Product.findOne({productid:req.params.id}).exec(function (err, foundProduct) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundProduct);
            // render the show template with the foundProduct
            res.render("product/show", {product: foundProduct});
        }
    });
});

// add to cart, POST route 
router.post("/", function (req, res) {
    // get data from the form
    var id = "2";
    console.log(req.params.id);
    //console.log(req.product.productid);
    var productid = "1";
    var newCart = {id: id, productid:productid};
    
    // create a new cart and save it to the Database
    Cart.create(newCart, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect to the product route

            res.redirect("/product");
        }
    });
});


// export the router module
module.exports = router;