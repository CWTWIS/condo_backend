const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validate = require("../middlewares/validator/auth-user")
const userRoute = express.Router()

userRoute.get("/", c.user.getAll)
userRoute.get("/:id", c.user.get)
userRoute.post("/register", validate.registerUser, c.user.register)
userRoute.post("/login", c.user.login)
userRoute.put("/:id", c.user.update)
userRoute.delete("/:id", authenticate, c.user.delete)

module.exports = userRoute
