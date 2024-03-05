const express = require("express")

const c = require("../controller")
const selectRoute = express.Router()

selectRoute.get("/districts", c.select.getDistricts)
selectRoute.get("/provinces", c.select.getProvinces)
selectRoute.get("/facilities", c.select.getFacilities)

module.exports = selectRoute
