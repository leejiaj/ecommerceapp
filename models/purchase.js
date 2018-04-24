var mongoose=require("mongoose");
    
var purchaseSchema={
	purchaseid:String,
    username:String,
    productid:String,
    purchasedate:String,
    purchaseamount:String,
    shippingaddress: String
};

module.exports=mongoose.model("Purchase",purchaseSchema);