const Joi = require("joi")

const postIdSchema = Joi.object({
    postId: Joi.number().integer().positive().required().messages({
        "number.base": "postId be a number",
        "number.integer": "postId be an integer",
    }),
})

exports.validatePostId = (req, res, next) => {
    const { value, error } = postIdSchema.validate(req.params)
    if (error) {
        throw error
    }
    req.postId = value.postId
    next()
}
