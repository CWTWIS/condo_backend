const { CustomError } = require("../config/error")

module.exports = async function checkAgentRole(req, res, next) {
    try {
        if (req.user.role !== "AGENT") next(new CustomError("You are unauthorized", "NotValidRole", 500))
        next()
    } catch (err) {
        next(err)
        console.log(err)
    }
}
