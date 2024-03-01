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

    let condoObj = await repo.condo.findCondoByNameTh(nameTh)
    console.log("condoObj", condoObj)

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
        condoObj = await repo.condo.createCondo(condoData)
    } else {
        const existedRoom = await repo.room.findRoomByRoomNumberFloorBuildingCondoId(roomNumber, floor, building, condoObj.id)
        console.log("roomNumber", roomNumber)
        console.log("existedRoom", existedRoom)
        if (existedRoom) throw new CustomError("ROOM_EXISTED", "403_FORBIDDEN", 403)
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

    const date = new Date()
    date.toISOString()
    const postData = {
        userId: req.user.id,
        expiresAt: date,
        roomId: roomObj.id,
    }

    const postObj = await repo.post.createPost(postData)

    const parsedRoomUtilsList = JSON.parse(req.body.roomUtilsList)
    await parsedRoomUtilsList.forEach(async (roomUtil) => {
        await repo.roomUtil.createRoomUtil({ roomId: roomObj.id, utilId: +roomUtil })
    })

    const parsedRoomImagesList = JSON.parse(req.body.roomImagesList)
    let roomImageFileCount = 0
    for (let roomImageObj in parsedRoomImagesList) {
        console.log("in loop")
        let roomImage = ""
        if (roomImageObj.image === "string") {
            roomImage = roomImageObj.roomImage
        } else {
            roomImage = await utils.cloudinaryUpload.upload(req.files.roomImages?.[roomImageFileCount].path)
            console.log("roomImageFileCount", roomImageFileCount)
            fs.unlink(req.files.roomImages?.[roomImageFileCount].path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log("File deleted successfully")
            })
            roomImageFileCount++
        }

        const roomImagesObj = await repo.roomImage.createRoomImage({ roomId: roomObj.id, roomImage })
    }

    res.status(201).json({ post: { ...req.body } })
})

exports.getPosts = catchError(async (req, res, next) => {
    const posts = await repo.post.getPosts()
    res.status(200).json({ posts })
})

exports.getPostByPostId = catchError(async (req, res, next) => {
    const post = await repo.post.getPostByPostId(+req.params.postId)
    res.status(200).json({ post })
})

exports.getPostsByUserId = catchError(async (req, res, next) => {
    console.log("first")
    const posts = await repo.post.getPostsByUserId(+req.params.userId)
    res.status(200).json({ posts })
})
