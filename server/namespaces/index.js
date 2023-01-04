// Handlers
const {Main, Room, User} = require('../handlers')

// socket middlewares
const { checkAuth } = require('../middlewares/io/auth')

module.exports = (io) => {

    // all my global middlewares
    io.on("new_namespace", (namespace) => {
        namespace.use(checkAuth);
    });

    // namespases
    const mainNS = io.of('/home')
    const roomNS = io.of('/room')
    const userNS = io.of('/user')

    // add hadlers
    roomNS.on("connection", Room)
    mainNS.on("connection", Main)
    userNS.on("connection", User)
}
