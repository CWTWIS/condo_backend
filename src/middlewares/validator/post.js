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
        "string.empty": "location is required",
        "any.required": "location is required",
    }),
    districtId: Joi.number().integer().positive().required().messages({
        "string.empty": "districtId is required",
        "any.required": "districtId is required",
        "number.base": "districtId be a number",
        "number.integer": "districtId be an integer",
    }),
    provinceId: Joi.number().integer().positive().required().messages({
        "string.empty": "provinceId is required",
        "any.required": "provinceId is required",
        "number.base": "provinceId be a number",
        "number.integer": "provinceId be an integer",
    }),
    postCode: Joi.string()
        .required()
        .trim()
        .pattern(/^\d{5}$/)
        .messages({
            "string.empty": "postCode is required",
            "any.required": "postCode is required",
            "string.pattern.base": "postCode must contain only 5 numbers",
        }),
    price: Joi.number().positive().required().messages({
        "string.empty": "price is required",
        "any.required": "price is required",
        "number.base": "price be a number",
    }),
    contract: Joi.number().integer().positive().required().messages({
        "string.empty": "contract is required",
        "any.required": "contract is required",
        "number.base": "contract be a number",
        "number.integer": "contract be an integer",
    }),
    roomNumber: Joi.string().required().trim().messages({
        "string.empty": "roomNumber is required",
        "any.required": "roomNumber is required",
    }),
    roomSize: Joi.number().positive().required().messages({
        "string.empty": "roomSize is required",
        "any.required": "roomSize is required",
        "number.base": "roomSize be a number",
    }),
    bedroom: Joi.number().integer().positive().required().messages({
        "string.empty": "bedroom is required",
        "any.required": "bedroom is required",
        "number.base": "bedroom be a number",
        "number.integer": "bedroom be an integer",
    }),
    bathroom: Joi.number().integer().positive().required().messages({
        "string.empty": "bathroom is required",
        "any.required": "bathroom is required",
        "number.base": "bathroom be a number",
        "number.integer": "bathroom be an integer",
    }),
    floor: Joi.string().required().trim().messages({
        "string.empty": "floor is required",
        "any.required": "floor is required",
    }),
    building: Joi.string().required().trim().messages({
        "string.empty": "building is required",
        "any.required": "building is required",
    }),
    isAvailable: Joi.boolean().required().messages({
        "string.empty": "isAvailable is required",
        "any.required": "isAvailable is required",
    }),
    description: Joi.string().trim().messages({
        "string.empty": "description is required",
        "any.required": "description is required",
    }),
    // condoImage: Joi.required().messages({
    //     "string.empty": "condoImage is required",
    //     "any.required": "condoImage is required",
    // }),
}).unknown(true)

exports.validatePostForm = validate(schemaPost)
