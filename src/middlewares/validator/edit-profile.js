const Joi = require("joi")

const validate = require("./validator")

const schemaUpdateProfile = Joi.object({
    username: Joi.string()
        .trim()
        .pattern(/^[a-zA-Z0-9]{6,}$/)
        .message({
            "string.empty": "Username is required",
            "any.required": "Username is required",
            "string.pattern.base": "Username must be at least 6 characters and contain only alphabets and numbers",
        })
        .optional(),

    email: Joi.string()
        .email({ tlds: false })
        .message({
            "string.empty": "Email is required",
            "any.required": "Email is required",
            "string.email": "Invalid email format",
        })
        .optional(),

    mobile: Joi.string()
        .pattern(/^[0][0-9]{9}$/)
        .message({
            "string.empty": "Mobile is required",
            "any.required": "Mobile is required",
            "string.pattern.base": "Invalid mobile format",
        })
        .optional(),
})

exports.editProfile = validate(schemaUpdateProfile)
