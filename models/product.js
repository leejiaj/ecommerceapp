var mongoose=require("mongoose");
    
var productSchema={
    name:String,
    price:String,
    image:String,
    description:String,
};

module.exports=mongoose.model("Product",productSchema);
