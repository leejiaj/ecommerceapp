var mongoose=require("mongoose");

var sectionSchema={
    name:String,
    categories:Array
}

module.exports=mongoose.model("Section",sectionSchema);
