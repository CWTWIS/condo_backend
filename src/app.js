//=====================================================Imported Zone
const express = require("express")
const dotenv = require("dotenv")
const http = require("http")
const socketio = require("socket.io")

const { addUser, removeUser, getUser, getUsersInRoom } = require("./controller/userTest")
//=====================================================local imported Zone

const restApiServer = require("./server/rest")

//=====================================================Constance Zone
dotenv.config({ path: "./.env" })
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
// const io = socketio(server)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:5177",
        methods: ["GET", "POST"],
        //   allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
})

//=====================================================Main Functions

restApiServer(app)

io.on("connection", (socket) => {
    console.log("we have a new connection!!!")

    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        socket.emit("message", { user: "admin", text: `${user.name}, welcome to the room ${user.room}` })

        socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined` })
        socket.join(user.room)

        callback()
    })
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit("message", { user: user.name, text: message })

        callback()
    })

    socket.on("disconnect", () => {
        console.log("user had left!!!")
    })
})

//=====================================================Listening Zone
console.log(`API DOCS ON:  http://${host}:${port}/docs`)
server.listen(+port, host, () => {
    console.log(`Server is running at http://${host}:${port}`)
})
