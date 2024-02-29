const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createCondo = async (data) => await prisma.user.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.findCondoByNameTh = async (nameTh) =>
    await prisma.condo.findFirst({
        where: nameTh,
    })
