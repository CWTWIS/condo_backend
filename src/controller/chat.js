const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

exports.chat = async (req, res, next) => {
    try {
        // const users = await repo.user.getAll()
        res.json({ mesage: "test socket server" })
    } catch (err) {
        next(err)
    }
    return
}

exports.getChatsByUserId = utils.catchError(async (req, res, next) => {
    const chats = await repo.chat.getLastChatsByUserId(+req.params.userId)
    res.status(200).json({ chats })
})

exports.getChatsByUserIdAndTalkerId = utils.catchError(async (req, res, next) => {
    const chats = await repo.chat.getChatByUserIdAndTalkerId(+req.params.userId, +req.params.talkerId)
    res.status(200).json({ chats })
})
