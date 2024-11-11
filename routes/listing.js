const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");


router.route("/")
    .get(wrapAsync(listingController.index))  //INDEX ROUTE
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));  //CREATE ROUTE

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))   //SHOW ROUTE 
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)) //UPDATE ROUTE
    .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing)); //DELETE ROUTE

//UPDATE ROUTE
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingController.renderUpdateForm));

module.exports = router;