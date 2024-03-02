const Joi = require("joi")

const userIdSchema = Joi.object({
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "userId be a number",
        "number.integer": "userId be an integer",
    }),
})

exports.validateUserId = (req, res, next) => {
    const { value, error } = userIdSchema.validate(req.params)
    if (error) {
        throw error
    }
    req.userId = value.userId
    next()
}
