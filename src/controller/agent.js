const { CustomError } = require("../config/error")
const repo = require("../repository")
const utils = require("../utils")

module.exports.login = utils.catchError(async (req, res, next) => {
    const { username, password } = req.body
    // GET username from database
    const agent = await repo.user.get({ username })
    if (!agent) throw new CustomError("username or password is wrong", "WRONG_INPUT", 400)

    // COMPARE password with database
    const result = await utils.bcrypt.compare(password, agent.password)
    if (!result) throw new CustomError("username or password is wrong", "WRONG_INPUT", 400)

    // DELETE KEY of password from user data
    delete agent.password
    // SIGN token from user data
    const token = utils.jwt.sign({ id: agent.id, username: agent.username })
    res.status(200).json({ token ,agent})
})

module.exports.register = utils.catchError(async (req, res, next) => {
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

    const token = utils.jwt.sign({ id: agent.id, username: agent.username })

    res.status(200).json({ token })
})
