const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoomUtil = async (data) => await prisma.roomUtil.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
