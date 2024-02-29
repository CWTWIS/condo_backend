const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoomImage = async (data) => await prisma.user.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
