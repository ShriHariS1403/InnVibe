const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); 
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validatelisting}=require("../middleware.js");
const Listingcontroller = require("../controller/listings.js")
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get( wrapAsync ( Listingcontroller.index )) //Index Route 
.post(                                    //Create Route
  isLoggedIn,
  upload.single('listing[image]'),  
  validatelisting,
    wrapAsync (Listingcontroller.createListing)
)

 //New Route 
 router.get("/new",isLoggedIn,Listingcontroller.renderNewForm);
 

router.route("/:id")
.get( wrapAsync(Listingcontroller.showListing))//Show Route
.put(                                          //Update Route
isLoggedIn,
isOwner,
upload.single("listing[image]"),
   validatelisting,
   wrapAsync (Listingcontroller.updateListing))
.delete(                                       //Delete Route
isLoggedIn,
isOwner,
 wrapAsync(Listingcontroller.destroyListing)
 );


 
 //Edit Route
 router.get("/:id/edit",
 isLoggedIn, 
 isOwner,
 wrapAsync (Listingcontroller.renderEditForm));

 module.exports=router;