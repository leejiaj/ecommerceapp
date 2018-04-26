var mongoose=require("mongoose");

var cartSchema=new mongoose.Schema({
    username:String,
    productid: String
});


module.exports=mongoose.model("Cart",cartSchema);