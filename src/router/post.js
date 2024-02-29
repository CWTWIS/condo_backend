const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validateUser = require("../middlewares/validator/auth-user")
const validateAgent = require("../middlewares/validator/auth-agent")
const postRoute = express.Router()
const upload = require("../middlewares/upload")

//dont forget to validate and authenticate
postRoute.post("/", upload.fields([{ name: "condoImage", maxCount: 1 }, { name: "roomImages" }]), c.post.createPost)

module.exports = postRoute
