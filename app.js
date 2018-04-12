var express= require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    router=express.Router(),
    mongoose=require("mongoose")

var Section=require("./models/section");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
mongoose.connect("mongodb://localhost/ecomm");

app.get("/",function(req,res){
    Section.find({},function(err,sections){
        if(err){
            console.log("Error while searching for sections")
        }
        else
        {
            res.render("index",{sections:sections})
        }
    })
    
});


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("YelpCamp server has started!"); 
});