const { CustomError } = require("../config/error")

function checkExistCredential(credential, input) {
    const { username, email, mobile } = credential

    if (email == input.email) throw new CustomError("EMAIL_IN_USE", "403_FORBIDDEN", 403)
    if (mobile == input.mobile) throw new CustomError("MOBILE_IN_USE", "403_FORBIDDEN", 403)
    if (username == input.username) throw new CustomError("USERNAME_IN_USE", "403_FORBIDDEN", 403)
}

module.exports = checkExistCredential
