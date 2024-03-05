const prisma = require("../config/prisma")

module.exports.getDistricts = async () => prisma.district.findMany({ select: { id: true, district: true } })
module.exports.getProvinces = async () => prisma.province.findMany({ select: { id: true, province: true } })
module.exports.getFacilities = async () => prisma.facility.findMany({ select: { id: true, name: true } })
