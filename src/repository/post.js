const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createPost = async (data) => await prisma.post.create({ data })
module.exports.getPosts = async () =>
    await prisma.post.findMany({
        include: { room: { include: { condo: true } } },
    })

// =========================================== CUSTOM REPOSITORY ===================================
module.exports.getPostByPostId = async (postId) =>
    await prisma.post.findFirst({
        where: { id: postId },
        include: { user: true, room: { include: { condo: true, roomImages: true, roomFacilities: { include: { facility: true } } } } },
    })

// module.exports.getPostsByUserId = async (userId) =>
//     await prisma.post.findMany({
//         where: { user: { id: +userId } },
//         include: { room: { include: { condo: true } } },
//     })

module.exports.getActivePostsByUserId = async (userId) =>
    await prisma.post.findMany({
        where: { AND: [{ user: { id: +userId } }, { postStatus: true }] },
        include: { room: { include: { condo: true } } },
    })

module.exports.getInactivePostsByUserId = async (userId) =>
    await prisma.post.findMany({
        where: { AND: [{ user: { id: +userId } }, { postStatus: false }] },
        include: { room: { include: { condo: true } } },
    })

module.exports.editPostById = async (days, postId) => {
    const newExpiresAt = new Date()
    newExpiresAt.setDate(newExpiresAt.getDate() + days)
    await prisma.post.update({ where: { id: postId }, data: { expiresAt: newExpiresAt, postStatus: true } })
}

module.exports.getPostInCondo = async (condoId) =>
    await prisma.post.findMany({
        where: { postStatus: true, room: { condoId } },
        include: {
            room: {
                include: {
                    condo: { include: { district: true, province: true } },
                    roomFacilities: { include: { facility: true } },
                    roomImages: true,
                },
            },
        },
    })
