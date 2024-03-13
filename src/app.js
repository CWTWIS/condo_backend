//=====================================================Imported Zone
const express = require("express")
const dotenv = require("dotenv")
const http = require("http")
const fs = require("fs")
const { writeFileSync } = require("fs")

const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "dl2twysji",
    api_key: "689749785935295",
    api_secret: "Hf988q1KUfGIbGOmtlGZxzS8Om0",
})

/////////////gotta move
const repo = require("./repository")

//=====================================================local imported Zone

const restApiServer = require("./server/rest")

//=====================================================Constance Zone
dotenv.config({ path: "./.env" })
const app = express()
const server = http.createServer(app)

//=====================================================Main Functions

restApiServer(app)

// module.exports = server

//=====================================================Listening Zone

const { Server } = require("socket.io")
// const cloudinary = require("./config/cloudinary")

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 1e8,
})

///////// from yt
io.on("connection", (socket) => {
    console.log("we have a new connection!!!")

    socket.on("sendMessage", async (messageObj, callback) => {
        // const user = getUser(socket.id)
        const newMessageObj = await repo.chat.createChat({
            senderId: messageObj.authUser.id,
            receiverId: messageObj.talker.talkerId,
            message: messageObj.message,
        })

        io.emit("message", {
            ...newMessageObj,
            sender: { ...messageObj.authUser },
        })

        callback()
    })

    socket.on("sendImage", async (messageObj, callback) => {
        // const user = getUser(socket.id)
        try {
            const newMessageObj = {
                id: socket.id,
                senderId: messageObj.authUser.id,
                receiverId: messageObj.talker.talkerId,
                message: messageObj.url,
                createdAt: new Date(),
                sender: { ...messageObj.authUser },
            }

            socket.emit("message", newMessageObj)

            const imageName = `image_${Date.now()}.jpg`
            const path = `public/images/${imageName}`

            writeFileSync(path, messageObj.image, (err) => {
                callback({ message: err ? "failure" : "success" })
            })
            const buffer = fs.readFileSync(path)

            cloudinary.uploader
                .upload_stream({ resource_type: "image" }, (error, result) => {
                    if (error) {
                        console.error(error)
                    } else {
                        const run = async () => {
                            await repo.chat.createChat({
                                senderId: messageObj.authUser.id,
                                receiverId: messageObj.talker.talkerId,
                                message: result.secure_url,
                            })
                        }
                        run()
                    }
                })
                .end(buffer)
            fs.unlinkSync(path)
        } catch (err) {
            console.log(err)
        }

        callback()
    })

    socket.on("disconnect", () => {
        console.log("user disconected")
    })
})

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8080
console.log(`API DOCS ON:  http://${host}:${port}/docs`)
server.listen(+port, host, () => {
    console.log(`Server is running at http://${host}:${port}`)
})
