var mongoose= require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
		{
			name:"Cloud",
			image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
			description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
		},
		{
			name:"Desert",
			image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
			description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
		},
		{
			name:"Desert",
			image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
			description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."

		},
		{
			name:"Desert",
			image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
			description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."

		}
		]

function seedDB(){
	//remove all campgrounds
	Campground.remove({},function(err){
//		if(err){
//			console.log(err);
//		}
//		console.log("removed campgrounds!");
//		//add a few campgrounds
//		data.forEach(function(seed){
//			Campground.create(seed, function(err, campground){
//				if(err){
//					console.log(err);
//				} else {
//					console.log("added a campground");
//					//create a comment
//					Comment.create(
//					{
//						text: "this place is great",
//						author:"Homer"
//					}, function(err, comment){
//						if(err){
//							console.log(err);
//						}else{
//							campground.comments.push(comment);
//							campground.save();
//							console.log("Created");
//						}
//						
//					});
//				}
//			});
//		});
	});
	
	//add a few comments
}
module.exports=seedDB;