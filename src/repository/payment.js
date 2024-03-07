const prisma = require("../config/prisma")

module.exports.createPayments = async (data) => await prisma.payment.create({ data })
module.exports.getPaymentByPaymentId = async (paymentId) => await prisma.payment.findFirst({ where: { paymentId } })
