var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    firstname: String,
    lastname: String,
    isAdmin:Boolean,
    gender: String,
    dob: String,
    mobilenumber: Number,
    address: String,
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);