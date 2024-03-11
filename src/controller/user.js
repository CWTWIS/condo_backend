const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

module.exports.getUserByUserId = utils.catchError(async (req, res, next) => {
    const user = await repo.user.getUserByUserId(+req.params.userId)
    delete user.password
    res.status(200).json({ user })
})
module.exports.updateProfile = utils.catchError(async (req, res, next) => {
    const { id, role } = req.user
    const { username, email, mobile } = req.body
    // check if username is duplicated
    const existingUsername = await repo.user.findUserNameOrMobileOrEmail({ username })
    if (existingUsername && existingUsername.id !== id) {
        throw new CustomError("Username already exists", "DUPLICATE_USERNAME", 400)
    }
    // check if email is duplicated
    const existingEmail = await repo.user.findUserNameOrMobileOrEmail({ email })
    if (existingEmail && existingEmail.id !== id) {
        throw new CustomError("Email already exists", "DUPLICATE_EMAIL", 400)
    }
    // check if mobile is duplicated
    const existingMobile = await repo.user.findUserNameOrMobileOrEmail({ mobile })
    if (existingMobile && existingMobile.id !== id) {
        throw new CustomError("Mobile number already exists", "DUPLICATE_MOBILE", 400)
    }
    // If role is "AGENT", mobile is required
    if (mobile) {
        if (role === "AGENT" && !mobile) {
            throw new CustomError("Mobile number is required for agents", "MISSING_MOBILE", 400)
        }
    }
    const editedUser = await repo.user.updateProfile(req.user.id, req.body)
    res.status(200).json({ editedUser })
})
