const express = require("express")

const c = require("../controller")
const validate = require("../middlewares/validator/auth-agent")
const agentRoute = express.Router()

agentRoute.post("/login", c.agent.login)
agentRoute.post("/register", validate.registerAgent, c.agent.register)

module.exports = agentRoute
