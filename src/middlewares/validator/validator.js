const fs = require("fs")
const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body)

    if (error) {
        if (req.files?.condoImage?.[0]) {
            fs.unlink(req.files?.condoImage?.[0].path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log("File deleted successfully")
            })
        }

        if (req.files?.roomImages?.length > 0) {
            req.files.roomImages.forEach((roomImage, index) => {
                fs.unlink(req.files.roomImages?.[index].path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log("File deleted successfully")
                })
            })
        }
        throw error
    }
    req.body = value
    next()
}

module.exports = validate
