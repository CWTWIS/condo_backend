//=====================================================Imported Zone
const express = require("express")
const dotenv = require("dotenv")
const http = require("http")

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

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST"],
    },
})

// const onlineUser = {};

// io.use((socket, next) => {
//   const userId = socket.handshake.auth.id;
//   onlineUser[userId] = socket.id;
//   next();
// });

// io.on("connection", (socket) => {
//   console.log("chat server online");
//   socket.on("message", (msg) => {
//     io.emit("recieved", msg);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

///////// from yt
io.on("connection", (socket) => {
    console.log("we have a new connection!!!")

    // socket.on("join", ({ name, room }, callback) => {
    //     const { error, user } = addUser({ id: socket.id, name, room })

    //     if (error) return callback(error)

    //     socket.emit("message", { user: "admin", text: `${user.name}, welcome to the room ${user.room}` })

    //     socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined` })
    //     socket.join(user.room)

    //     callback()
    // })
    socket.on("sendMessage", async (messageObj, callback) => {
        // const user = getUser(socket.id)
        console.log("i did")
        const newMessageObj = await repo.chat.createChat({
            senderId: messageObj.authUser.id,
            receiverId: messageObj.talker.talkerId,
            message: messageObj.message,
        })

        // io.to(user.room).emit("message", { user: user.name, text: message })
        io.emit("message", {
            ...newMessageObj,
            sender: { ...messageObj.authUser },
            // message: messageObj.message,
            // createdAt: new Date(),
        })

        callback()
    })

    socket.on("disconnect", () => {
        console.log("user disconected")
        // const user = removeUser(socket.id)

        // if (user) {
        //     io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left` })
        // }
    })
})

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8080
console.log(`API DOCS ON:  http://${host}:${port}/docs`)
server.listen(+port, host, () => {
    console.log(`Server is running at http://${host}:${port}`)
})
