const prisma = require("../config/prisma")

module.exports.create = async (data) => await prisma.user.create({ data })

module.exports.findUserNameOrMobileOrEmail = async (data) =>
    await prisma.user.findFirst({
        where: {
            OR: [{ email: data.email }, { mobile: data.mobile }, { username: data.username }],
        },
    })
