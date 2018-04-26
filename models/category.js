var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var categorySchema={
    name:String,
    categoryid:Number
}

module.exports=mongoose.model("Category",categorySchema);