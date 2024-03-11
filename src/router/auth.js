const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validateUser = require("../middlewares/validator/auth-user")
const validateAgent = require("../middlewares/validator/auth-agent")
const authRoute = express.Router()

authRoute.get("/me", authenticate, c.auth.getMe)
authRoute.get("/", authenticate, c.auth.get)
authRoute.post("/register", validateUser.registerUser, c.auth.register)
authRoute.post("/register/agent", validateAgent.registerAgent, c.auth.registerAgent)
authRoute.post("/login", c.auth.login)

module.exports = authRoute
