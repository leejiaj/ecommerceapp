var mongoose=require("mongoose");

var cartSchema=new mongoose.Schema({
    username:String,
    productid: String,
    //qty: Number
});


module.exports=mongoose.model("Cart",cartSchema);