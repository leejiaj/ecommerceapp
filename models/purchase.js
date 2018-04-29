var mongoose=require("mongoose");
    
var purchaseSchema={
	purchaseid:String,
    username:String,
    productid:String,
    purchasedate:String,
    mobilenumber:Number,
    shippingaddress: String,
    orderstatus: String,
    productid: String,
};

module.exports=mongoose.model("Purchase",purchaseSchema);