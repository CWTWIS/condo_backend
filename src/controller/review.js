const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")

exports.createReview = utils.catchError(async (req, res, next) => {
    const existedReview = await repo.review.getReviewByUserId(+req.params.userId)
    if (existedReview) throw new CustomError("REVIEW_EXISTED", "403_FORBIDDEN", 403)
    const data = { ...req.body, userId: +req.params.userId }
    const review = await repo.review.createReview(data)
    res.status(201).json({ review })
})

exports.getReviews = utils.catchError(async (req, res, next) => {
    const reviews = await repo.review.getReviews()
    res.status(200).json({ reviews })
})

exports.getReviewByUserId = utils.catchError(async (req, res, next) => {
    const review = await repo.review.getReviewByUserId(+req.params.userId)
    res.status(200).json({ review })
})

exports.editReviewByUserId = utils.catchError(async (req, res, next) => {
    const existedReview = await repo.review.getReviewByUserId(+req.params.userId)
    if (!existedReview) throw new CustomError("REVIEW_NOT_FOUND", "403_FORBIDDEN", 403)
    const review = await repo.review.editReviewByUserId(existedReview.id, req.body)
    res.status(200).json({ review })
})
