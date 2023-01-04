// Handlers
const roomHandler = require("./room")
const userHandler = require("./user")

// on connect to main namespase
// on "/"
exports.Main = socket => {
    console.log(socket.id, "connected");
}

// on "/room"
exports.Room = socket => {
    console.log("room");
    roomHandler(socket)
}

// on "/user"
exports.User = socket => {
    console.log("user");
    userHandler(socket)
}