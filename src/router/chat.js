const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const chatRoute = express.Router()

//dont forget to validate and authenticate
chatRoute.get("/", c.chat.chat)
chatRoute.get("/:userId", c.chat.getLastChatsByUserId)
chatRoute.get("/:userId/:talkerId", c.chat.getChatByUserIdAndTalkerId)

module.exports = chatRoute
