 var mongoose=require("mongoose");

var wishlistSchema=new mongoose.Schema({
    username:String,
    productid: String,
    //qty: Number
});


module.exports=mongoose.model("Wishlist",wishlistSchema);