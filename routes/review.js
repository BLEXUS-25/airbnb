const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn,isReviewAuthor } = require("../middleware.js");
const Review = require("../models/review.js");
const reviewController = require("../controllers/reviews.js");


//Review Create/Post Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Review Delete Route
router.delete("/:reviewId",isReviewAuthor,isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;