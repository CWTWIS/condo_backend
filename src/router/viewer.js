const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const viewerRoute = express.Router()

// viewerRoute.get("/", c.vi)
// viewerRoute.post("/", c.vi)

module.exports = viewerRoute
