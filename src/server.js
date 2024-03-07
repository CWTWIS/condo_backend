// const server = require("./app")
// const { Server } = require("socket.io")

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"],
//         credentials: true,
//         methods: ["GET", "POST"],
//     },
// })

// const { addUser, removeUser, getUser, getUsersInRoom } = require("./controller/userTest")

// // const onlineUser = {};

// // io.use((socket, next) => {
// //   const userId = socket.handshake.auth.id;
// //   onlineUser[userId] = socket.id;
// //   next();
// // });

// // io.on("connection", (socket) => {
// //   console.log("chat server online");
// //   socket.on("message", (msg) => {
// //     io.emit("recieved", msg);
// //   });
// //   socket.on("disconnect", () => {
// //     console.log("user disconnected");
// //   });
// // });

// ///////// from yt
// io.on("connection", (socket) => {
//     console.log("we have a new connection!!!")

//     // socket.on("join", ({ name, room }, callback) => {
//     //     const { error, user } = addUser({ id: socket.id, name, room })

//     //     if (error) return callback(error)

//     //     socket.emit("message", { user: "admin", text: `${user.name}, welcome to the room ${user.room}` })

//     //     socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined` })
//     //     socket.join(user.room)

//     //     callback()
//     // })
//     socket.on("sendMessage", (message, callback) => {
//         // const user = getUser(socket.id)
//         console.log("i did")

//         // io.to(user.room).emit("message", { user: user.name, text: message })
//         io.emit("message", { user: "john", message: message })

//         callback()
//     })

//     socket.on("disconnect", () => {
//         console.log("user disconected")
//         // const user = removeUser(socket.id)

//         // if (user) {
//         //     io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left` })
//         // }
//     })
// })
