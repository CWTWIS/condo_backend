const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.createViewer = async (data) => await prisma.viewer.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
module.exports.findExistedViewer = async (ipAddress, postId) => await prisma.viewer.findFirst({ where: { AND: [{ ipAddress }, { postId }] } })
