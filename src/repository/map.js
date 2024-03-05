const prisma = require("../config/prisma")

module.exports.getCondos = async () => await prisma.condo.findMany({ include: { district, province } })
