// Models
const { Room, User } = require("../models")

// Utils
const { HandleReturn } = require("../utils/handleRes")

exports.getRooms = async () => {
    const allRooms = await Room.find().populate({ path: "auther"})

    // Sort Rooms
    let rooms = []

    let room = allRooms.find(r => r.next == null)
    rooms.push(room)
    let lastRoom = room

    while (true) {
        room = allRooms.find(r => r.next == lastRoom.id)
        if (!room) {break}
        rooms.push(room)
        lastRoom = room
    }

    rooms = rooms.reverse()

    return HandleReturn.ok({rooms})
}

exports.getUserRooms = async (userId) => {
    const rooms = await Room.find({auther: userId})

    return HandleReturn.ok({rooms})
}

exports.getRoomAuther = async (roomId) => {
    const room = await Room.findById(roomId)

    return HandleReturn.ok({auther: room?.auther})
}

exports.getRoomIdBySlug = async (slug) => {
    const room = await Room.findOne({slug}).select("_id")

    return HandleReturn.ok({id: room?.id})
}

exports.getRoom = async (roomId) => {
    const room = await Room.findById(roomId)

    return HandleReturn.ok({room})
}

exports.getRoomAndMessages = async (roomId) => {
    const room = await Room.findById(roomId)

    return HandleReturn.ok({room})
}

exports.createRoom = async (roomData) => {

    if (
        !roomData?.name ||
        !roomData?.auther
    ) {
        return HandleReturn.error("filds required")
    }

    try {
        const room = await Room.create(roomData)

        return HandleReturn.ok({room})
    } catch (err) {
        return HandleReturn.error(err.message, err.statusCode)
    }
}

exports.editRoom = async (roomId, roomData, autherId) => {

    if (!roomId){
        return HandleReturn.error("room id is requried")
    }
    
    // Get User
    const user = await User.findById(autherId)

    // Get room
    const room = await Room.findById(roomId)

    // Check permissions
    if (room?.auther != user?.id && user?.role != "admin" && user?.role != "staff"){
        return HandleReturn.error("no permissions")
    }

    try {
        const room = await Room.findByIdAndUpdate(roomId, roomData, {
            new: true,
            runValidators:true
        })
    
        return HandleReturn.ok({room})
    } catch (err) {
        return HandleReturn.error(err.message, err.statusCode)
    }
}

exports.deleteRoom = async (roomId, autherId) => {

    if (!roomId){
        return HandleReturn.error("room id is requried")
    }

    // Get User
    const user = await User.findById(autherId)

    // Get room
    const room = await Room.findById(roomId)

    
    // Check permissions
    if (room?.auther != user?.id && user?.role != "admin" && user?.role != "staff"){
        return HandleReturn.error("no permissions")
    }
    
    await Room.findByIdAndDelete(roomId)

    return HandleReturn.ok({room})
}

// you should put this function in gold :)
exports.reposition = async (itemId, nextItemId, editorId) => {

    const editorUser = await User.findById(editorId)

    // Check permissions
    if (editorUser?.role !== "admin") {
        return HandleReturn.error("no permission")
    }

    if (nextItemId === itemId) {
        return HandleReturn.error("canceled")
    }

    let item = await Room.findById(itemId)

    if (!item) {
        return HandleReturn.error("item requried")
    }

    let nextItem = await Room.findById(nextItemId)

    if (!nextItem) {
        return HandleReturn.error("canceled")
    }

    let pervItem = await Room.findOne({next: item.id})

    if (pervItem && pervItem.id != nextItem.id) {
        pervItem.next = item.next
        await pervItem.save()
    }

    if (item.id != nextItem.next){
        item.next = nextItem.next
    }

    nextItem.next = item.id

    await nextItem.save()
    await item.save()

    return HandleReturn.ok({item})
}