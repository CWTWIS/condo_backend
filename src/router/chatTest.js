const express = require("express")

const c = require("../controller")
// const authenticate = require("../middlewares/authenticate")
const chatTestRoute = express.Router()

//dont forget to validate and authenticate
chatTestRoute.get("/", (req, res) => {
    res.send("server is up and running")
})

module.exports = chatTestRoute
