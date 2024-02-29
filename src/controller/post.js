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
        lng,
        location,
        district,
        province,
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

    console.log("req.body", req.body)

    const { id: condoId } = await repo.condo.findCondoByNameTh(nameTh)
    if (condoByNameTh) {
        const condoData = {
            nameTh,
            nameEn,
            lat,
            lng,
            location,
            district,
            province,
            postCode,
        }

        if (req.files?.condoImage) {
            condoData.condoImage = await utils.cloudinaryUpload.upload(req.files?.condoImage?.[0].path)
        }
        await repo.condo.createCondo(condoData)
    }

    const roomData = {
        condoId,
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
    }
    const { id: roomId } = await repo.room.createRoom(roomData)

    // const parsedRoomImages = JSON.parse(req.body.roomImages)
    // parsedRoomImages.forEach(async (el, index) => {
    //     let roomImage = ""
    //     if (el.roomImage) {
    //         if (typeof el.roomImage === "string") {
    //             roomImage = el.roomImage
    //         } else {
    //             roomImage = await utils.cloudinaryUpload.upload(el.image.path)
    //             fs.unlink(el.image.path)
    //         }

    //         await repo.roomImage.createRoomImage({ roomId, roomImage })
    //     }
    // })

    res.status(201).json({ post: { condoId, roomId, ...req.body } })
})
