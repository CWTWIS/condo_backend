const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createCondo = async (data) => await prisma.condo.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.findCondoByName = async (nameTh, nameEn) =>
    await prisma.condo.findFirst({
        where: { OR: [{ nameTh: nameTh }, { nameEn: nameEn }] },
    })

module.exports.getCondos = async () => await prisma.condo.findMany({})

module.exports.getCondosForMap = async () => await prisma.condo.findMany({ include: { province: true, district: true } })

module.exports.getCondoWithPost = async (id) => await prisma.condo.findFirst({ where: { id }, include: { rooms: { include: { post: true } } } })
