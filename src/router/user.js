const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const { validateUserId } = require("../middlewares/validator/userId")
const validateEdit = require("../middlewares/validator/edit-profile")
const userRoute = express.Router()

userRoute.get("/profile/:userId", validateUserId, c.auth.checkExistUser, c.user.getUserByUserId)
userRoute.patch("/profile", authenticate, validateEdit.editProfile, c.user.updateProfile)
// userRoute.post("/:id/reset-password", authenticate, c.auth.resetPassword)

module.exports = userRoute
