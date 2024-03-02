const express = require("express")

const c = require("../controller")
// const authenticate = require("../middlewares/authenticate")
const { validateUserId } = require("../middlewares/validator/userId")
const userRoute = express.Router()

userRoute.get("/profile/:userId", validateUserId, c.auth.checkExistUser, c.user.getUserByUserId)

module.exports = userRoute
