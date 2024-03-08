const prisma = require("../config/prisma")

module.exports.createReview = async (data) => await prisma.review.create({ data })
module.exports.getReviews = async () => await prisma.review.findMany()
module.exports.getReviewByUserId = async (userId) => await prisma.review.findFirst({ where: { userId } })
module.exports.editReviewByUserId = async (reviewId, data) => await prisma.review.update({ where: { id: reviewId }, data })
