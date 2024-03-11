const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

module.exports.getMinMaxPrice = utils.catchError(async (req, res, next) => {
    const price = await repo.room.getMinMaxPrice()
    res.status(200).json({ price })
})
