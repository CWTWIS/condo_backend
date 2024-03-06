const prisma = require("../config/prisma")

module.exports.createPayments = async (data) => await prisma.payment.create({ data })
