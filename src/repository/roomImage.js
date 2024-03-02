const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoomImage = async (data) => await prisma.roomImage.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
