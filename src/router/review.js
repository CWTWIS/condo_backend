const express = require("express")
const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validateReview = require("../middlewares/validator/review")

const reviewRoute = express.Router()

reviewRoute.post("/:userId", authenticate, validateReview.validateReview, c.review.createReview)
reviewRoute.get("/", c.review.getReviews)
reviewRoute.get("/:userId", authenticate, c.review.getReviewByUserId)
reviewRoute.patch("/:userId", authenticate, validateReview.validateReview, c.review.editReviewByUserId)

module.exports = reviewRoute
