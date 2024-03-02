const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
// const validateUser = require("../middlewares/validator/auth-user")
// const validateAgent = require("../middlewares/validator/auth-agent")
const { validateUserId } = require("../middlewares/validator/userId")
const userRoute = express.Router()

// userRoute.get("/", authenticate, c.auth.getAll)
userRoute.get("/profile/:userId", validateUserId, c.auth.checkExistUser, c.user.getUserByUserId)

module.exports = userRoute
