const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validateUser = require("../middlewares/validator/auth-user")
const validateAgent = require("../middlewares/validator/auth-agent")
const userRoute = express.Router()

userRoute.get("/", authenticate, c.chat.chat)

module.exports = userRoute
