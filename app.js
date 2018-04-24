var express= require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    passport=require("passport"),
    flash=require("connect-flash"), 
    passportLocalMongoose=require("passport-local-mongoose"),
    methodOverride=require("method-override"),
    localStrategy=require("passport-local"),
    router=express.Router(),
    User=require("./models/user"),
    Product=require("./models/product"),
    mongoose=require("mongoose")

var Section=require("./models/section");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());



//Passport configuration
app.use(require("express-session")({
    secret:"Khul ja sim sim",
    resave:false,
    saveUninitialized:false
}));
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
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

mongoose.connect("mongodb://localhost/ecomm");


var authRoutes=require("./routes/auth");
var adminRoutes=require("./routes/admin");
var profileRoutes= require("./routes/profile");
var cartRoutes= require("./routes/viewcart");
var wishlistRoutes= require("./routes/viewwishlist");
var purchaseRoutes= require("./routes/purchase");
var productRoutes=require("./routes/product");

app.use(authRoutes);
app.use("/admin",adminRoutes);
app.use("/edit_profile",profileRoutes);
app.use("/shopping_cart",cartRoutes);
app.use("/MyWishlist",wishlistRoutes);
app.use("/MyOrders",purchaseRoutes);
app.use("/product",productRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("YelpCamp server has started!"); 
});