const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.get = async (where) => await prisma.user.findUnique({ where })
// module.exports.getAll = async () => await prisma.user.findMany()
module.exports.create = async (data) => await prisma.user.create({ data })
module.exports.updateProfile = async (id, data) => await prisma.user.update({ where: { id }, data })
module.exports.delete = async ({ id }) => await prisma.user.delete({ where: { id } })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.findUserNameOrMobileOrEmail = async (data) =>
    await prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { mobile: data.mobile }, { username: data.username }],
        },
    })

module.exports.getUserByUserId = async (userId) =>
    await prisma.user.findFirst({
        where: { id: +userId },
    })
