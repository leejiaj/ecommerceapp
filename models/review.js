var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var reviewSchema=new mongoose.Schema({
    productid:String,
    reviewtext:String
});

module.exports=mongoose.model("Review",reviewSchema);