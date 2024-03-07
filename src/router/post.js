const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const checkAgentRole = require("../middlewares/checkAgentRole")
const validatePost = require("../middlewares/validator/post")
const { validatePostId } = require("../middlewares/validator/postId")
const { validateUserId } = require("../middlewares/validator/userId")
const postRoute = express.Router()
const upload = require("../middlewares/upload")

//dont forget to validate and authenticate
postRoute.post(
    "/",
    authenticate,
    checkAgentRole,
    upload.fields([{ name: "condoImage", maxCount: 1 }, { name: "roomImages" }]),
    validatePost.validatePostForm,
    c.post.createPost,
)
postRoute.get("/", c.post.getPosts)
postRoute.get("/:postId", validatePostId, c.post.checkExistPost, c.post.getPostByPostId)
postRoute.get("/profile/:userId", validateUserId, c.auth.checkExistUser, c.post.getPostsByUserId)
postRoute.patch("/", c.post.editPostById)
postRoute.get("/condo/:condoId", c.post.getPostInCondo)
// postRoute.patch("/", c.post.editPostStatusAndDateById)
postRoute.patch("/:postId", validatePostId, c.post.checkExistPost)

module.exports = postRoute
