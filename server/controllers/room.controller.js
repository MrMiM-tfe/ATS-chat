// Utils
const { HandleRes } = require("../utils/handleRes")

// Services
const { roomService } = require("../services")

exports.getAllRoooms = async (req, res) => {
    const rooms = await roomService.getRooms()

    HandleRes(res, {rooms})
}

exports.createRoom = async (req, res) => {

    if (!req.user){
        return HandleRes(res)
    }

    const auther = req.user.id

    req.body.auther = auther

    const {room} = await roomService.createRoom(req.body)

    HandleRes(res, {room})
}