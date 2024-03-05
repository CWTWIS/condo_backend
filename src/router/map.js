const express = require("express")

const c = require("../controller")
const mapRoute = express.Router()

mapRoute.get("/", c.condo.getCondos)

module.exports = mapRoute
