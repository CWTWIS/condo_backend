const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

module.exports.getUserByUserId = utils.catchError(async (req, res, next) => {
    const user = await repo.user.getUserByUserId(+req.params.userId)
    delete user.password
    res.status(200).json({ user })
})
