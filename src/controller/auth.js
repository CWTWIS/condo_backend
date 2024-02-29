const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

// module.exports.getAll = async (req, res, next) => {
//     try {
//         const users = await repo.user.getAll()
//         res.status(200).json({ users })
//     } catch (err) {
//         next(err)
//     }
//     return
// }
module.exports.get = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await repo.user.get({ id })
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
    return
}
// edit
module.exports.login = utils.catchError(async (req, res, next) => {
    const { username, password } = req.body
    // GET username from database
    const user = await repo.user.get({ username })
    if (!user) throw new CustomError("username or password is wrong", "WRONG_INPUT", 400)

    // COMPARE password with database
    const result = await utils.bcrypt.compare(password, user.password)
    if (!result) throw new CustomError("username or password is wrong", "WRONG_INPUT", 400)

    // DELETE KEY of password from user data
    delete user.password
    // SIGN token from user data
    const token = utils.jwt.sign(user)
    res.status(200).json({ token, user })
})

// edit
module.exports.register = utils.catchError(async (req, res, next) => {
    const data = {}
    data.username = req.body?.username
    data.mobile = req.body?.mobile
    data.email = req.body?.email

    const existsUser = await repo.user.findUserNameOrMobileOrEmail(data)

    // check username mobile or email
    if (existsUser) utils.checkExistCredential(existsUser, req.body)

    const hashed = await utils.bcrypt.hashed(req.body.password)
    // CREATE user to database
    req.body.password = hashed
    const user = await repo.user.create(req.body)
    // DELETE KEY of password from user data
    delete user.password
    // SIGN token from user data

    const token = utils.jwt.sign(user)

    res.status(200).json({ token, user })
})

module.exports.registerAgent = utils.catchError(async (req, res, next) => {
    const data = {}
    data.username = req.body?.username
    data.mobile = req.body?.mobile
    data.email = req.body?.email

    const existsUser = await repo.agent.findUserNameOrMobileOrEmail(data)

    // check username mobile or email
    if (existsUser) utils.checkExistCredential(existsUser, req.body)

    const hashed = await utils.bcrypt.hashed(req.body.password)

    req.body.password = hashed

    req.body.role = "AGENT"

    const agent = await repo.user.create(req.body)

    delete agent.password

    const token = utils.jwt.sign(agent)

    res.status(200).json({ token, agent })
})

module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { firstName, lastName } = req.body
        const user = await repo.user.update({ id }, { firstName, lastName })

        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
    return
}
module.exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params
        await repo.user.delete({ id })
        res.status(200)
    } catch (err) {
        next(err)
    }
    return
}
