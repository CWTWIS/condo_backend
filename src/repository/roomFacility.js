const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoomFacility = async (data) => await prisma.roomFacility.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
