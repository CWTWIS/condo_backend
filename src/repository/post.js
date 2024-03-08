const prisma = require("../config/prisma")

// =================== CRON JOB: check if expired ================
var cron = require("node-cron")

const isPostExpired = (post) => {
    const currentDate = new Date()
    const expiresAtDate = new Date(post.expiresAt)
    return currentDate > expiresAtDate
}

const updatePostStatusIfExpired = async (postId) => {
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (post && isPostExpired(post)) {
        await prisma.post.update({
            where: { id: postId },
            data: { postStatus: false },
        })
        console.log(`Post ${postId} status is expired.`)
    }
}

cron.schedule("0 0 * * *", async () => {
    console.log("Running task to update post statuses at 12:00AM...")
    const allPosts = await prisma.post.findMany()
    for (const post of allPosts) {
        await updatePostStatusIfExpired(post.id)
    }
    console.log("Task completed.")
})

// =========================================== BASIC CRUD ===================================
module.exports.createPost = async (data) => await prisma.post.create({ data })

module.exports.updatePost = async (data, postId) => await prisma.post.update({ where: { id: +postId }, data })

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

module.exports.editPostStatusAndDateById = async (days, postId) => {
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
module.exports.editPostById = async (postId, editedData) => {
    await prisma.update({ where: { id: postId }, data: { editedData } })
}
