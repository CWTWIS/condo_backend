const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validateUser = require("../middlewares/validator/auth-user")
const validateAgent = require("../middlewares/validator/auth-agent")
const userRoute = express.Router()

userRoute.get("/me", authenticate, c.auth.getMe)
userRoute.get("/", authenticate, c.auth.get)
userRoute.post("/register", validateUser.registerUser, c.auth.register)
userRoute.post("/register/agent", validateAgent.registerAgent, c.auth.registerAgent)
userRoute.post("/login", c.auth.login)
userRoute.put("/:id", authenticate, c.auth.update)
userRoute.delete("/:id", authenticate, c.auth.delete)

module.exports = userRoute
