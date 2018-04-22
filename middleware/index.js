var Product=require("../models/product");
//var Comment=require("../models/comment")
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
module.exports=middlewareObj;

