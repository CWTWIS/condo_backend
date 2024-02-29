const fs = require("fs")
const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")
const catchError = require("../utils/catch-error")

exports.createPost = catchError(async (req, res, next) => {
    // validateRecipe(req.body)
    const {
        nameTh,
        nameEn,
        lat,
        long,
        location,
        districtId,
        provinceId,
        postCode,
        price,
        contract,
        roomNumber,
        roomSize,
        bedroom,
        bathroom,
        floor,
        building,
        isAvailable,
        description,
    } = req.body

    const condoObj = await repo.condo.findCondoByNameTh(nameTh)
    if (!condoObj) {
        const condoData = {
            nameTh,
            nameEn,
            lat,
            long,
            location,
            districtId: +districtId,
            provinceId: +provinceId,
            postCode,
        }

        if (req.files?.condoImage?.length > 0) {
            condoData.condoImage = await utils.cloudinaryUpload.upload(req.files?.condoImage?.[0].path)
        }
        await repo.condo.createCondo(condoData)
    }
    fs.unlink(req.files?.condoImage?.[0].path, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("File deleted successfully")
    })

    const roomData = {
        condoId: condoObj.id,
        price: +price,
        contract: +contract,
        roomNumber,
        roomSize: +roomSize,
        bedroom: +bedroom,
        bathroom: +bathroom,
        floor,
        building,
        isAvailable: !!+isAvailable,
        description,
    }
    const roomObj = await repo.room.createRoom(roomData)

    const parsedRoomImagesList = JSON.parse(req.body.roomImagesList)
    let roomImageFileCount = 0
    for (let roomImageObj in parsedRoomImagesList) {
        let roomImage = ""
        if (roomImageObj.image === "string") {
            roomImage = roomImageObj.roomImage
        } else {
            roomImage = await utils.cloudinaryUpload.upload(req.files.roomImages?.[roomImageFileCount].path)
            fs.unlink(req.files.roomImages?.[roomImageFileCount].path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log("File deleted successfully")
            })
            roomImageFileCount++
        }

        await repo.roomImage.createRoomImage({ roomId: roomObj.id, roomImage })
    }

    res.status(201).json({ post: { ...req.body } })
})
