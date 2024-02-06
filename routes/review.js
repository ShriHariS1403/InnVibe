const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js"); 
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor}=require("../middleware.js");
const reviewController = require("../controller/reviews.js");


 
//Reviews
//Post route

router.post("/",
validateReview,
isLoggedIn,
wrapAsync(reviewController.createReview));

// Delete Review Route

router.post("/:reviewId",
isLoggedIn,
isreviewAuthor,
wrapAsync(reviewController.destroyReview));

module.exports=router;