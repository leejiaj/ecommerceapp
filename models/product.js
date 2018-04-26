var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var textSearch = require('mongoose-text-search');

var productSchema=new mongoose.Schema({
    productname:String,
    description:String,
    imageId:String,
    productimage1:String,
    productimage2:String,
    productimage3:String,
    productimage4:String,
    productimage5:String,
    vendorid:String,
    stockavailable:String,
    rating:String,
    price:String,
    category:String,
    section:String
});

// give our schema text search capabilities
productSchema.plugin(textSearch);
productSchema.index({productname: 'text', 'description': 'text'});
module.exports=mongoose.model("Product",productSchema);