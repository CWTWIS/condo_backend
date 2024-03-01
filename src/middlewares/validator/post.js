const Joi = require("joi")

const validate = require("./validator")

const schemaPost = Joi.object({
    nameTh: Joi.string()
        .required()
        .trim()
        .pattern(/^[ๅภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ๑๒๓๔ู฿๕๖๗๘๙๐ฎฑธํ๊ณฯญฐฅฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦ0-9@ ]{3,}$/)
        .messages({
            "string.empty": "nameTh is required",
            "any.required": "nameTh name is required",
            "string.pattern.base": "thai must be at least 3 characters and contain only thai alphabet, number, @ sign, and white space",
        }),
    nameEn: Joi.string()
        .required()
        .trim()
        .pattern(/^[a-zA-Z0-9@ ]{3,}$/)
        .messages({
            "string.empty": "nameEn is required",
            "any.required": "nameEn name is required",
            "string.pattern.base": "english must be at least 3 characters and contain only english alphabet, number, @ sign, and white space",
        }),
    lat: Joi.string()
        .required()
        .trim()
        .pattern(/^[0-9]{1,}[.][0-9]{1,}$/)
        .messages({
            "string.empty": "lat is required",
            "any.required": "lat is required",
            "string.pattern.base": "lat must contain only number and dot (.)",
        }),
    long: Joi.string()
        .required()
        .trim()
        .pattern(/^[0-9]{1,}[.][0-9]{1,}$/)
        .messages({
            "string.empty": "long is required",
            "any.required": "long is required",
            "string.pattern.base": "long must contain only number and dot (.)",
        }),
    location: Joi.string().required().trim().messages({
        "string.empty": "thai name is required",
        "any.required": "english name is required",
    }),
    districtId: Joi.number().integer().positive().required().messages({
        "string.empty": "districtId is required",
        "any.required": "districtId is required",
        "number.base": "districtId be a number",
        "number.integer": "districtId be an integer",
    }),
}).unknown()

exports.validatePostForm = validate(schemaPost)
