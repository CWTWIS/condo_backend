const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")
const IP = require("ip")

module.exports.createViewer = utils.catchError(async (req, res, next) => {
    const ipAddress = IP.address()
    const isExistedViewer = await repo.viewer.findExistedViewer(ipAddress, +req.params.postId)
    if (isExistedViewer) {
        res.status(200).json({ message: "Viewer Existed" })
    } else {
        const viewer = await repo.viewer.createViewer({ ipAddress, postId: +req.params.postId })
        const post = await repo.post.increaseTotalViewer(+req.params.postId)
        res.status(201).json({ viewer, post })
    }
})
