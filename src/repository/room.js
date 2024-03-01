const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoom = async (data) => await prisma.room.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.findRoomByRoomNumberFloorBuildingCondoId = async (roomNumber, floor, building, condoId) => {
    console.log("roomNumber", roomNumber)
    return await prisma.room.findFirst({
        where: { roomNumber, floor, building, condoId },
    })
}
