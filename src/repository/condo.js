const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createCondo = async (data) => await prisma.condo.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.findCondoByName = async (nameTh, nameEn) =>
    await prisma.condo.findFirst({
        where: { OR: [{ nameTh: nameTh }, { nameEn: nameEn }] },
    })

module.exports.getCondos = async () => await prisma.condo.findMany({})
