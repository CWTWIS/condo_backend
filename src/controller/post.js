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
        condoImage,
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

    const parsedRoomFacilityList = JSON.parse(req.body.roomFacilityList)
    await parsedRoomFacilityList.forEach(async (roomFacility) => {
        await repo.roomFacility.createRoomFacility({ roomId: roomObj.id, facilityId: +roomFacility })
    })

    const parsedRoomImageList = JSON.parse(req.body.roomImageList)
    let roomImageFileCount = 0
    for (let roomImageObj of parsedRoomImageList) {
        let roomImage = ""
        if (typeof roomImageObj.file === "string" && roomImageObj.file !== "") {
            roomImage = roomImageObj.file
        } else {
            console.log("in create")
            roomImage = await utils.cloudinaryUpload.upload(req.files.roomImages?.[roomImageFileCount].path)
            console.log("roomImageFileCount", roomImageFileCount)
            roomImageFileCount++
        }

        await repo.roomImage.createRoomImage({ roomId: roomObj.id, roomImage })
    }

    res.status(201).json({ post: { ...req.body, id: postObj.id } })
})

exports.editPost = utils.catchErrorCreatePost(async (req, res, next) => {
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
        condoImage,
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
        } else if (typeof condoImage === "string" && condoImage !== "") {
            condoData.condoImage = condoImage
        }
        condoObj = await repo.condo.createCondo(condoData)
    } else {
        const existedRoom = await repo.room.findRoomByRoomNumberFloorBuildingCondoId(roomNumber, floor, building, condoObj.id)
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
    const roomObj = await repo.room.updateRoom(roomData, +req.params.roomId)

    const date = new Date()
    date.toISOString()
    const postData = {
        expiresAt: date,
    }

    const postObj = await repo.post.updatePost(postData, +req.params.postId)

    await repo.roomFacility.deleteRoomFacility(roomObj.id)
    const parsedRoomFacilityList = JSON.parse(req.body.roomFacilityList)
    await parsedRoomFacilityList.forEach(async (roomFacility) => {
        await repo.roomFacility.createRoomFacility({ roomId: roomObj.id, facilityId: +roomFacility })
    })

    await repo.roomImage.deleteRoomImage(roomObj.id)
    const parsedRoomImageList = JSON.parse(req.body.roomImageList)
    let roomImageFileCount = 0
    for (let roomImageObj of parsedRoomImageList) {
        let roomImage = ""
        if (typeof roomImageObj.file === "string" && roomImageObj.file !== "") {
            roomImage = roomImageObj.file
        } else {
            roomImage = await utils.cloudinaryUpload.upload(req.files.roomImages?.[roomImageFileCount].path)
            roomImageFileCount++
        }

        await repo.roomImage.createRoomImage({ roomId: roomObj.id, roomImage })
    }

    res.status(200).json({ post: { ...req.body, id: postObj.id } })
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
    // comment
    const active = await repo.post.getActivePostsByUserId(+req.params.userId)
    const inactive = await repo.post.getInactivePostsByUserId(+req.params.userId)
    res.status(200).json({ posts: { active, inactive } })
})

// exports.editPostStatusAndDateById = utils.catchError(async (req, res, next) => {
//     const days = req.body.days
//     const newExpiresAt = new Date()
//     newExpiresAt.setDate(newExpiresAt.getDate() + days)
//     const post = await repo.post.editPostById(newExpiresAt, +req.body.postId)
//     res.status(200).json({ post })
// })

exports.editPostById = utils.catchError(async (req, res, next) => {
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
    // ---------condo-------------
    // change condo??? แปลกๆหรือมันคือกรณีกรอกข้อมูลคอนโดผิด + รูป
    const condoEditedData = {
        nameTh,
        nameEn,
        lat,
        long,
        location,
        districtId: +districtId,
        provinceId: +provinceId,
        postCode,
    }

    // ---------room--------------
    // room แก้ได้
    const roomEditedData = {
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

    // ----------post-------------
    // น่าจะ update แต่ updated at เพราะ userId cratedAt expriedAt postStatus RoomId ไม่เปลี่ยน
    // const editedPost = await repo.post.editPostById(+req.params.postId, editedData)
})

exports.getPostInCondo = utils.catchError(async (req, res, next) => {
    const id = +req.params.condoId
    const posts = await repo.post.getPostInCondo(id)
    res.status(200).json({ posts })
})
