const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createChat = async (data) => await prisma.chat.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.getLastChatsByUserId = async (userId) =>
    await prisma.chat.findMany({
        orderBy: { id: "desc" },
        where: { OR: [{ senderId: +userId }, { receiverId: +userId }] },
        distinct: ["senderId", "receiverId"],
        include: {
            receiver: { select: { id: true, firstName: true, lastName: true } },
            sender: { select: { id: true, firstName: true, lastName: true } },
        },
    })

module.exports.getChatByUserIdAndTalkerId = async (userId, talkerId) =>
    await prisma.chat.findMany({
        orderBy: { id: "asc" },
        where: { OR: [{ AND: [{ senderId: +userId }, { receiverId: +talkerId }] }, { AND: [{ senderId: +talkerId }, { receiverId: +userId }] }] },
        include: {
            receiver: { select: { id: true, firstName: true, lastName: true } },
            sender: { select: { id: true, firstName: true, lastName: true } },
        },
    })
