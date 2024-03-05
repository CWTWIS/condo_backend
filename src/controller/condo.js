const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

module.exports.getCondos = utils.catchError(async (req, res, next) => {
    const condos = await repo.condo.getCondos()
    res.status(200).json({ condos })
})

exports.getCondosForMap = utils.catchError(async (req, res, next) => {
    const condos = await repo.condo.getCondosForMap()
    res.status(200).json({ condos })
})
