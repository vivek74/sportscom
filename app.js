var express      =require("express"),
	app          =express(),
	bodyParser   =require("body-parser"),
	mongoose  	 = require("mongoose"),
	passport	 =require("passport"),
	LocalStrategy=require("passport-local"),
	methodOverride=require("method-override"),
	Campground 	 =require("./models/campground"),
	Comment      =require("./models/comment"),
	User	     =require("./models/user"),
	seedDB       =require("./seeds")

//requiring routes

var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index")


       //database connection
mongoose.connect('mongodb://localhost/yelp_camp', { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("database conected!");
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();//seed the database

//passport configration
app.use(require("express-session")({
	secret: "Once again rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());      //taking the data from the session decoded and uncode it
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function(){
console.log("server started on 3000");
});
