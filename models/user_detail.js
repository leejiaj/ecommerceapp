var mongoose=require("mongoose");

var userDetailSchema=new mongoose.Schema({
    username:String,
    firstname: String,
    lastname: String,
    gender: String,
    dob: String,
    mobilenumber: Number,
    address: String,
});


module.exports=mongoose.model("User_detail",userDetailSchema);