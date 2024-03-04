const fs = require("fs")
const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")

exports.checkExistPost = utils.catchError(async (req, res, next) => {
    const existPost = await repo.post.getPostByPostId(+req.params.postId)
    if (!existPost) throw new CustomError("POST_NOT_FOUND", "403_FORBIDDEN", 403)
    req.post = existPost
    next()
})

exports.createPost = utils.catchErrorCreatePost(async (req, res, next) => {
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

    let condoObj = await repo.condo.findCondoByName(nameTh, nameEn)
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

    const parsedRoomUtilList = JSON.parse(req.body.roomUtilList)
    await parsedRoomUtilList.forEach(async (roomUtil) => {
        await repo.roomUtil.createRoomUtil({ roomId: roomObj.id, utilId: +roomUtil })
    })

    const parsedRoomImageList = JSON.parse(req.body.roomImageList)
    let roomImageFileCount = 0
    for (let roomImageObj in parsedRoomImageList) {
        let roomImage = ""
        if (typeof roomImageObj.file === "string") {
            roomImage = roomImageObj.file
        } else {
            roomImage = await utils.cloudinaryUpload.upload(req.files.roomImages?.[roomImageFileCount].path)
            console.log("roomImageFileCount", roomImageFileCount)
            roomImageFileCount++
        }

        await repo.roomImage.createRoomImage({ roomId: roomObj.id, roomImage })
    }

    res.status(201).json({ post: { ...req.body, id: postObj.id } })
})

exports.getPosts = utils.catchError(async (req, res, next) => {
    const posts = await repo.post.getPosts()
    res.status(200).json({ posts })
})

exports.getPostByPostId = utils.catchError(async (req, res, next) => {
    const post = await repo.post.getPostByPostId(+req.params.postId)
    res.status(200).json({ post })
})

exports.getPostsByUserId = utils.catchError(async (req, res, next) => {
    const active = await repo.post.getActivePostsByUserId(+req.params.userId)
    const inactive = await repo.post.getActivePostsByUserId(+req.params.userId)
    res.status(200).json({ posts: { active, inactive } })
})
