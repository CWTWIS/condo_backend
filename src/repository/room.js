const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createRoom = async (data) => await prisma.user.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
