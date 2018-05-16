var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
//index- show all campgrounds
router.get("/", function(req,res){
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Campground.find({name: regex}, function(err, allCampgrounds){
			if(err){
				consol.log(err);
			} else {
				res.render("campgrounds/index",{campgrounds:allCampgrounds});
			}
		});
	} else {
 	//get all campground from db
		Campground.find({}, function(err, allCampgrounds){
			if(err){
				consol.log(err);
			} else {
				res.render("campgrounds/index",{campgrounds:allCampgrounds});
			}
		});
		}
 	});

//create- add new campgrounds to db

 router.post("/",isLoggedIn,function(req, res){
 	var name=req.body.name;
 	var image=req.body.image;
 	var desc=req.body.description;
 	var author={
 		id:req.user._id,
 		username:req.user.username
 	}
 	var newCampground={name: name, image: image, description:desc, author:author}
 	Campground.create(newCampground,function(err,newlyCreated){
 		if(err){
 			console.log(err);
 		} else {
 			res.redirect("/campgrounds");
 		}
 	});
 	
 });

 router.get("/new",isLoggedIn,function(req,res){
 	res.render("campgrounds/new");
 });
// show -shows more info about one campground
 router.get("/:id", function(req, res){
 	//find the campgroun with provided ID
 	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
 		if(err){
 			console.log(err);
 		} else {
 			//console.log(foundCampground)
 			//render show template with that campground
 			res.render("campgrounds/show", {campground: foundCampground});
 		}
 	});
 	
 });
// edit campoground route

router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err ,foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//update campground route

router.put("/:id", checkCampgroundOwnership ,function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect somewhere(show page)
});

// dlete campground route
router.delete("/:id", checkCampgroundOwnership , function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

 function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
function checkCampgroundOwnership(req,res,next){
	if(req.isAuthenticated()){
		
			Campground.findById(req.params.id, function(err ,foundCampground){
				if(err){
					res.redirect("back")
				} else {
				//does user own the campgroung?
					if(foundCampground.author.id.equals(req.user._id)){
						next();
					} else{
						res.redirect("back");
					}
				}
			});
	} else {
		res.redirect("back");
	}
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
 module.exports=router;