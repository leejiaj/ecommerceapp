var express    = require("express");
var router     = express.Router();
var Product    = require("../models/product");
var Cart       = require("../models/cart");
var middleware = require("../middleware");
var User = require("../models/user");


// INDEX -- view all products, GET route
router.get("/:category", function (req, res) {
    // get all products data from Datebase
    Product.find({section:"Men",category:req.params.category}, function (err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            console.log(allProducts);
            res.render("product/index", {products: allProducts, currentUser: req.user});
        }
    });
});

// export the router module
module.exports = router;