const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.getLastChatsByUserId = async (userId) =>
    await prisma.chat.findMany({
        orderBy: { id: "desc" },
        where: { OR: [{ senderId: +userId }, { receiverId: +userId }] },
        distinct: ["senderId", "receiverId"],
        include: { receiver: { select: { firstName: true, lastName: true } }, sender: { select: { firstName: true, lastName: true } } },
    })

module.exports.getChatByUserIdAndTalkerId = async (userId, talkerId) =>
    await prisma.chat.findMany({
        orderBy: { id: "desc" },
        where: { OR: [{ AND: [{ senderId: +userId }, { receiverId: +talkerId }] }, { AND: [{ senderId: +talkerId }, { receiverId: +userId }] }] },
        include: { receiver: { select: { firstName: true, lastName: true } }, sender: { select: { firstName: true, lastName: true } } },
    })
