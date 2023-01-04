// Services
const { roomService, messageService } = require("../services")

// Utils
const { Res } = require("../utils/handleRes")

module.exports = (socket) => {

    const deleteRoom = async (roomSlug, res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_messages)")
        }

        // check room slug
        if (!roomSlug) {
            return Res.Error(res, "'roomSlug' is required")
        }

        // get room id from slug
        const {id} = await roomService.getRoomIdBySlug(roomSlug)

        // delete room
        const {room:deletedRoom} = await roomService.deleteRoom(id, socket.user.id)

        if (!deletedRoom) {
            return Res.Error(res, "room not deleted")
        }

        const rooms = await roomService.getRooms()

        // send delete room event to all sockets in room namespace
        socket.nsp.emit("room_delete", rooms)
    }

    /**
     * @desc    join curent socket to room
     * @param   {String} roomSlug room slug
     * @param   {Object} res res function
     */
    const joinRoom = async (roomSlug, res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_messages)")
        }

        // check room slug
        if (!roomSlug) {
            return Res.Error(res, "'roomSlug' is required")
        }

        // get room id from slug
        const {id} = await roomService.getRoomIdBySlug(roomSlug)

        // get room by id
        let {room} = await roomService.getRoom(id)

        // check if room exist
        if (!room) {
            return Res.Error(res, "room not found")
        }

        // leave last rooms
        socket.rooms.forEach(r => {
            if (!r.includes(socket.id)){
                socket.leave(r)
            }
        });

        // join clinet to room
        socket.join(room.id)

        socket.emit("joind", room)

        return Res.Success(res, {room})
    }

    /**
     * @desc  create message object to databasse and bodcast object to in room sockets
     * @param {String} text massage text
     * @param {Object} res respons function
     */
    const sendMessage = async (text, res) => {
        
        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_messages)")
        }

        // get last room user is on it
        const rooms = [...socket.rooms]
        const room = rooms.at(-1)

        // check if user is joid to any rooms
        if (!room || room.includes(socket.id)) {
            return Res.Error(res, "User is not in eny rooms")
        }

        // check room text
        if (!text || text.length == 0) {
            return Res.Error(res, "'text' is required")
        }

        const {message} = await messageService.createMessage(room, socket.user.id, text)

        socket.nsp.to(room).emit("message", message)
    }

    /**
     * @desc  room get messages
     * @param {String} roomSlug room slug
     * @param {Number} chunk chunk to load
     * @param {Object} res res function
     */
    const getMessages = async (roomSlug, chunk, res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_messages)")
        }

        // check room slug
        if (!roomSlug) {
            return Res.Error(res, "'roomSlug' is required")
        }

        // check chuck
        if (typeof chunk !== "number") {
            return Res.Error(res, "'chunk' is required and must by number")
        }

        // get room id from slug
        const {id} = await roomService.getRoomIdBySlug(roomSlug)

        // get room messages by id
        const messages = await messageService.getRoomMessages(id, chunk)

        Res.Success(res, {messages})
    }

    // get all rooms
    const getRooms = async (res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_all)")
        }

        const rooms = await roomService.getRooms()
        Res.Success(res, {rooms})
    }

    // create room
    const createRoom = async (roomData, res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (create)")
        }

        // check required filds
        if (!roomData?.name){
            return Res.Error(res, "'name' is required")
        }

        // set room auther
        roomData.auther = socket.user.id

        // create room base on roomData
        const room = await roomService.createRoom(roomData)
        
        const rooms = await roomService.getRooms()
        
        socket.nsp.emit("update_rooms", rooms)

        // sent res
        Res.Success(res, {room})
    }

    const editRoom = async (roomSlug, roomData, res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_messages)")
        }

        // check room slug
        if (!roomSlug) {
            return Res.Error(res, "'roomSlug' is required")
        }

        // get room id from slug
        const {id} = await roomService.getRoomIdBySlug(roomSlug)

        // get room by id
        let {room} = await roomService.getRoom(id)

        // check if room exist
        if (!room) {
            return Res.Error(res, "room not found")
        }

        const {room:newRoom} = await roomService.editRoom(room.id, roomData, socket.user.id)

        const rooms = await roomService.getRooms()
        
        socket.nsp.emit("update_rooms", rooms)

        return Res.Success(res, {room: newRoom})
    }

    const repositionRoom = async (itemId, nextItemId, res) => {

        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (reposition)")
        }

        // reposition room
        const {item} = await roomService.reposition(itemId, nextItemId, socket.user.id)

        // check if room exist
        if (!item) {
            return Res.Error(res, "room not repositioned")
        }

        const rooms = await roomService.getRooms()

        socket.nsp.emit("update_rooms", rooms)

        return Res.Success(res, {room: "room repositioned"})
    }

    socket.on("get_all", getRooms)
    socket.on("create", createRoom)
    socket.on("get_messages", getMessages)
    socket.on("send_message", sendMessage)
    socket.on("join", joinRoom)
    socket.on("delete_room", deleteRoom)
    socket.on("edit_room", editRoom)
    socket.on("reposition", repositionRoom)
}