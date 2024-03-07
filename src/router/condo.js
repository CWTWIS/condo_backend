const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const condoRoute = express.Router()

//dont forget to validate and authenticate
condoRoute.get("/", c.condo.getCondos)
condoRoute.get("/map", c.condo.getCondosForMap)
condoRoute.get("/:condoId", c.condo.getCondoWithPost)

module.exports = condoRoute
