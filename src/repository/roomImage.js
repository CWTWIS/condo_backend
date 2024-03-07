const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoomImage = async (data) => await prisma.roomImage.create({ data })

module.exports.deleteRoomImage = async (roomId) => await prisma.roomImage.deleteMany({ where: { roomId: +roomId } })
// =========================================== CUSTOM REPOSITORY ===================================
