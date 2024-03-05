const repo = require("../repository")
const utils = require("../utils")

exports.getDistricts = utils.catchError(async (req, res, next) => {
    const districts = await repo.select.getDistricts()
    res.json({ districts })
})
exports.getProvinces = utils.catchError(async (req, res, next) => {
    const provinces = await repo.select.getProvinces()
    res.json({ provinces })
})
exports.getFacilities = utils.catchError(async (req, res, next) => {
    const facilities = await repo.select.getFacilities()
    res.json({ facilities })
})
