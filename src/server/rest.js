//=====================================================Imported Zone
const express = require("express")
const { json, urlencoded } = require("express")
const cors = require("cors")
const morgan = require("morgan")

//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound")
const { errorMiddlewares } = require("../middlewares/error")
const CustomError = require("../config/error")
const authRoute = require("../router/auth")
const chatRoute = require("../router/chat")
const userRoute = require("../router/user")
const postRoute = require("../router/post")
const condoRoute = require("../router/condo")
const roomRoute = require("../router/room")
const selectRoute = require("../router/select")
const transactionRoute = require("../router/transaction")
const chatTestRoute = require("../router/chatTest")
const reviewRoute = require("../router/review")
const viewerRoute = require("../router/viewer")
const ipRoute = require("../router/ip")

//=====================================================Server Zone
module.exports = function restApiServer(app) {
    //=====================================================Encoding Zone
    app.use(morgan("dev"))
    app.use(cors())
    app.use(json())
    app.use(urlencoded({ extended: false }))
    app.use(express.static("public"))

    //=====================================================Routing Zone
    app.use("/ping", (req, res, next) => {
        try {
            console.log("Checking the API status: Everything is OK")
            res.status(200).json("pong")
        } catch (error) {
            next(new CustomError("Ping Error", "NotFoundData", 500))
        }
    })
    app.use(chatTestRoute)
    app.use("/auth", authRoute)
    app.use("/chat", chatRoute)
    app.use("/user", userRoute)
    app.use("/post", postRoute)
    app.use("/condo", condoRoute)
    app.use("/room", roomRoute)
    app.use("/transaction", transactionRoute)
    app.use("/select", selectRoute)
    app.use("/review", reviewRoute)
    // app.use("/viewer", viewerRoute)
    app.use("/ip", ipRoute)
    //=====================================================Throwing Zone
    app.use(notFound)
    app.use(errorMiddlewares)
}
