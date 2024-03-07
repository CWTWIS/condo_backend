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

exports.getLastChatsByUserId = utils.catchError(async (req, res, next) => {
    const chats = await repo.chat.getLastChatsByUserId(+req.params.userId)
    const talkerMap = {}
    const lastChats = chats.reduce((talkerList, chatObj) => {
        const talkerObj =
            chatObj.senderId === +req.params.userId
                ? { talkerId: chatObj.receiverId, talkerName: chatObj.receiver }
                : { talkerId: chatObj.senderId, talkerName: chatObj.sender }
        if (!talkerMap[talkerObj.talkerId]) {
            talkerMap[talkerObj.talkerId] = 1
            talkerList.push({ talkerObj, message: chatObj.message, id: chatObj.id, createdAt: chatObj.createdAt })
            console.log("talkerMap", talkerMap)
        }
        return talkerList
    }, [])
    res.status(200).json({ chats: lastChats })
})

exports.getChatByUserIdAndTalkerId = utils.catchError(async (req, res, next) => {
    const chats = await repo.chat.getChatByUserIdAndTalkerId(+req.params.userId, +req.params.talkerId)
    console.log("in g")
    console.log("chats", chats)
    res.status(200).json({ chats })
})
