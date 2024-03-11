const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoom = async (data) => await prisma.room.create({ data })
module.exports.updateRoom = async (data, roomId) => await prisma.room.update({ where: { id: roomId }, data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.findRoomByRoomNumberFloorBuildingCondoId = async (roomNumber, floor, building, condoId) => {
    return await prisma.room.findFirst({
        where: { roomNumber, floor, building, condoId },
    })
}

module.exports.getMinMaxPrice = async () => await prisma.room.aggregate({ _min: { price: true }, _max: { price: true } })
