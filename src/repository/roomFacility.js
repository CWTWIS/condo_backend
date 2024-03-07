const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoomFacility = async (data) => await prisma.roomFacility.create({ data })

module.exports.deleteRoomFacility = async (roomId) => await prisma.roomFacility.deleteMany({ where: { roomId: +roomId } })

// =========================================== CUSTOM REPOSITORY ===================================
