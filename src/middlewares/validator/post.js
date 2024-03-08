const Joi = require("joi")

const validate = require("./validator")

const schemaPost = Joi.object({
    nameTh: Joi.string()
        .required()
        .trim()
        .pattern(/^[ๅภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ๑๒๓๔ู฿๕๖๗๘๙๐ฎฑธํ๊ณฯญฐฅฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦ0-9@ ]{3,}$/)
        .messages({
            "string.empty": "Name in Thai is required",
            "any.required": "Name in Thai is required",
            "string.pattern.base": "Name must be at least 3 characters and contain only Thai alphabet, number, @ sign, and white space",
        }),
    nameEn: Joi.string()
        .required()
        .trim()
        .pattern(/^[a-zA-Z0-9@ ]{3,}$/)
        .messages({
            "string.empty": "Name in English is required",
            "any.required": "Name in English is required",
            "string.pattern.base": "Name must be at least 3 characters and contain only English alphabet, number, @ sign, and white space",
        }),
    lat: Joi.string()
        .required()
        .trim()
        .pattern(/^[0-9.]{1,}$/)
        .messages({
            "string.empty": "lat is required",
            "any.required": "lat is required",
            "string.pattern.base": "lat must contain only number and dot (.)",
        }),
    long: Joi.string()
        .required()
        .trim()
        .pattern(/^[0-9.]{1,}$/)
        .messages({
            "string.empty": "long is required",
            "any.required": "long is required",
            "string.pattern.base": "long must contain only number and dot (.)",
        }),
    location: Joi.string().required().trim().messages({
        "string.empty": "Location is required",
        "any.required": "Location is required",
    }),
    districtId: Joi.number().integer().positive().required().messages({
        "string.empty": "District is required",
        "any.required": "District is required",
        "number.base": "District is required",
        "number.integer": "District is required",
    }),
    provinceId: Joi.number().integer().positive().required().messages({
        "string.empty": "Province is required",
        "any.required": "Province is required",
        "number.base": "Province is required",
        "number.integer": "Province is required",
    }),
    postCode: Joi.string()
        .required()
        .trim()
        .pattern(/^\d{5}$/)
        .messages({
            "string.empty": "Postal code is required",
            "any.required": "Postal code is required",
            "string.pattern.base": "Postal code must contain only 5 numbers",
        }),
    price: Joi.number().positive().required().messages({
        "string.empty": "Price per month is required",
        "any.required": "Price per month is required",
        "number.base": "Price must be a number",
    }),
    contract: Joi.number().integer().positive().required().messages({
        "string.empty": "Minimum duration of contract is required",
        "any.required": "Minimum duration of contract is required",
        "number.base": "Minimum duration of contract is required",
        "number.integer": "Minimum duration of contract is required",
    }),
    roomNumber: Joi.string().required().trim().messages({
        "string.empty": "Room number is required",
        "any.required": "Room number is required",
    }),
    roomSize: Joi.number().positive().required().messages({
        "string.empty": "Room size is required",
        "any.required": "Room size is required",
        "number.base": "Room size must be a number",
    }),
    bedroom: Joi.number().integer().positive().required().messages({
        "string.empty": "Bedroom is required",
        "any.required": "Bedroom is required",
        "number.base": "Bedroom is required",
        "number.integer": "Bedroom is required",
    }),
    bathroom: Joi.number().integer().positive().required().messages({
        "string.empty": "Bathroom is required",
        "any.required": "Bathroom is required",
        "number.base": "Bathroom is required",
        "number.integer": "Bathroom is required",
    }),
    floor: Joi.string().required().trim().messages({
        "string.empty": "Floor is required",
        "any.required": "Floor is required",
    }),
    building: Joi.string().required().trim().messages({
        "string.empty": "Building is required",
        "any.required": "Building is required",
    }),
    isAvailable: Joi.required().messages({
        "string.empty": "isAvailable is required",
        "any.required": "isAvailable is required",
    }),
    description: Joi.string().trim().messages({
        "string.empty": "Description is required",
        "any.required": "Description is required",
    }),
    // condoImage: Joi.required().messages({
    //     "string.empty": "condoImage is required",
    //     "any.required": "condoImage is required",
    // }),
}).unknown(true)

exports.validatePostForm = validate(schemaPost)
