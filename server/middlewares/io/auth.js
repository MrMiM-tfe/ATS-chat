const {tokenService} = require("../../services")

const checkAuth = async (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        const token = socket.handshake.query.token
        const user = await tokenService.tokenCheck(token)
        if (user){
            socket.user = user
            next()
        }else{
            next(new Error("not auth"))
        }
    }else {
        next(new Error("not auth"))
    }
}

module.exports = {
    checkAuth
}