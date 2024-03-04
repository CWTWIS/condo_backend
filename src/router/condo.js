const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const condoRoute = express.Router()

//dont forget to validate and authenticate
condoRoute.get("/", c.condo.getCondos)

module.exports = condoRoute
