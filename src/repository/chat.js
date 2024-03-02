const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.getLastChatsByUserId = async (userId) =>
    await prisma.chat.findMany({
        where: { OR: [{ senderId: +userId }, { receiverId: +userId }] },
        distinct: ["senderId", "receiverId"],
        orderBy: { createdAt: "desc" },
    })

module.exports.getChatByUserIdAndTalkerId = async (userId, talkerId) =>
    await prisma.chat.findMany({
        where: { OR: [{ AND: [{ senderId: +userId }, { receiverId: +talkerId }] }, { AND: [{ senderId: +talkerId }, { receiverId: +userId }] }] },
    })
