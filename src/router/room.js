const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const roomRoute = express.Router()

//dont forget to validate and authenticate
roomRoute.get("/price", c.room.getMinMaxPrice)

module.exports = roomRoute
