const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const validatePost = require("../middlewares/validator/post")
const postRoute = express.Router()
const upload = require("../middlewares/upload")

//dont forget to validate and authenticate
postRoute.post(
    "/",
    authenticate,
    upload.fields([{ name: "condoImage", maxCount: 1 }, { name: "roomImages" }]),
    validatePost.validatePostForm,
    c.post.createPost,
)
postRoute.get("/", c.post.getPosts)

module.exports = postRoute
