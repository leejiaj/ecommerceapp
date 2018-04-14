var express= require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    passport=require("passport"),
    passportLocalMongoose=require("passport-local-mongoose"),
    methodOverride=require("method-override"),
    localStrategy=require("passport-local"),
    router=express.Router(),
    User=require("./models/user"),
    mongoose=require("mongoose")

var Section=require("./models/section");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));



//Passport configuration
app.locals.moment=require("moment");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var sections;
Section.find({},function(err,sects){
    if(err){
        console.log("error")
    }
    else
    {
        sections=sects;
    }
})

app.use(function(req,res,next){
    res.locals.sections=sections;
    next();
});

mongoose.connect("mongodb://localhost/ecomm");


var authRoutes=require("./routes/auth");





app.use(authRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("YelpCamp server has started!"); 
});