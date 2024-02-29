const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

module.exports.chat = async (req, res, next) => {
    try {
        // const users = await repo.user.getAll()
        res.json({ mesage: "test socket server" })
    } catch (err) {
        next(err)
    }
    return
}
