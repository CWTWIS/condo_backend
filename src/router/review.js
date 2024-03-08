const express = require("express")
const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validateReview = require("../middlewares/validator/review")

const reviewRoute = express.Router()

reviewRoute.post("/", authenticate, validateReview.validateReview, c.review.createReview)
reviewRoute.get("/", c.review.getReviews)
reviewRoute.get("/me", authenticate, c.review.getReviewByUserId)
reviewRoute.patch("/", authenticate, validateReview.validateReview, c.review.editReviewByUserId)

module.exports = reviewRoute
