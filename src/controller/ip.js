const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const IP = require("ip")

module.exports.getIp = utils.catchError(async (req, res, next) => {
    const ipAddress = IP.address()
    res.status(200).json({ ipAddress })
})
