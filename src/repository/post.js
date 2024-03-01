const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createPost = async (data) => await prisma.post.create({ data })
module.exports.getPosts = async () =>
    await prisma.post.findMany({
        include: { user: true, room: { include: { condo: true, roomImages: true, roomUtils: { include: { util: true } } } } },
    })

// =========================================== CUSTOM REPOSITORY ===================================
module.exports.getPostByPostId = async (postId) =>
    await prisma.post.findFirst({
        where: { id: postId },
        include: { user: true, room: { include: { condo: true, roomImages: true, roomUtils: { include: { util: true } } } } },
    })

module.exports.getPostsByUserId = async (userId) =>
    await prisma.post.findMany({
        where: { user: { id: +userId } },
        include: { room: { include: { condo: true, roomImages: true, roomUtils: { include: { util: true } } } } },
    })
