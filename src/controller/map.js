const repo = require("../repository")
const utils = require("../utils")

exports.getCondos = utils.catchError(async (req, res, next) => {
    const condos = await repo.condo.getCondos()
    res.status(200).json({ condos })
})
