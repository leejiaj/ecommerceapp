var Product=require("../models/product");
var Review=require("../models/review");
var middlewareObj={};

middlewareObj.checkOwnership=function (req,res,next)
{
   if( req.isAuthenticated()){
        
            
                if( req.user.isAdmin){
                    next();
                }
                else
                {
                    req.flash("error","You do not have the permission to do that");
                    res.redirect("back");
                }
            
        
    }
    else
    {
        req.flash("error","You need to be logged in first!")
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in first!");
    res.redirect("/login");
}


// middleware to check if the user has the review ownership
middlewareObj.checkReviewOwnership = function (req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        // find the review with the requested id
        Review.findById(req.params.review_id, function (err, foundReview) {
            if (err) {
                res.redriect("back");
            } else {
                // does the user own the review?
                if (foundReview.username === req.user.username) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        // send flash notification to user to log in first
        req.flash("error", "You don't have permission to do that!");
        res.redirect("back");
    }
}

module.exports=middlewareObj;

