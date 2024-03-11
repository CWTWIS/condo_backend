const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const ipRoute = express.Router()

//dont forget to validate and authenticate
ipRoute.get("/", c.ip.getIp)

module.exports = ipRoute
