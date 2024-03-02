const fs = require("fs")

module.exports = (fn) => (req, res, next) =>
    fn(req, res, next)
        .catch(next)
        .finally(() => {
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
        })
