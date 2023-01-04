// Models
const { Room, Message, User } = require("../models")

const { HandleReturn } = require('../utils/handleRes')

exports.createMessage = async (roomId, auther, text) => {

    // Get room to check
    const room = await Room.findById(roomId)
    
    // check if room exist
    if (!room) {
        return HandleReturn.error("room not found")
    }
    
    // create message obj
    let messageData = {
        room: room.id,
        auther,
        text
    }

    try {
        // create message
        const message = await Message.create(messageData)

        // get auther
        await message.populate("auther")
    
        return HandleReturn.ok({message})
    } catch (err) {
        return HandleReturn.error(err.message, err.statusCode)
    }
}


exports.getRoomMessages = async (room, chunk = 0, limit = 100) => {

    // get messages
    const messages = await Message.find({room}).skip(chunk * limit).limit(limit).populate({ path: "auther"})

    return HandleReturn.ok({messages})
}