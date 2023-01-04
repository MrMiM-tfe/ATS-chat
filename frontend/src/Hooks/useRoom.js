import { useEffect, useState } from "react"
import Socket from "../Socket/"

const socket = Socket("room")

const useRoom = () => {

    // hooks
    const [State, setState] = useState("offline")
    const [Rooms, setRooms] = useState([])
    const [Messages, setMessages]  = useState([])
    const [CurrentRoom, setCurrentRoom] = useState(null)
    const [Pending, setPending] = useState(false)

    useEffect(() => {

        socket.on("connect", (a) => {
            console.log("connected");
            setState("online")
        })

        socket.on("connect_error", (err) => {
            console.log(err);
        })

        socket.emit("get_all",(res) => {
            if (res.type === "Success") {
                setRooms(res.rooms)
            }
        })

        socket.on("message", (message) => {
            setMessages((last) => last.concat(message))
        })

        socket.on("update_rooms", ({rooms}) => {
            setRooms(rooms)
        })

        socket.on("room_delete", ({rooms}) => {
            setRooms(rooms)
            setCurrentRoom(null)
        })


    },[])

    const GetRooms =() => {
        socket.emit("get_all",(res) => {
            if (res.type === "Success") {
                setRooms(res.rooms)
            }
        })
    }

    const RepositionRoom = (roomId, nextRoomId) => {
        socket.emit("reposition", roomId, nextRoomId, res => {
            console.log(res);
        })
    }

    const CreateRoom = (data) => {
        socket.emit("create", data, (res) => {
            console.log(res);
        })
    }

    const EditRoom = (room, data) => {
        setPending(true)
        socket.emit("edit_room", room, data, (res) => {
            console.log(res);
            setPending(false)
        })
    }

    const DeleteRoom = (room) => {
        socket.emit("delete_room", room, (res) => {
            console.log(res);
        })
    }

    const JoinRoom = (room) => {
        socket.emit("join", room, ({room}) => {
            setCurrentRoom(room)
        })
    }

    const GetRoomMessages = (room) => {
        socket.emit("get_messages", room, 0,(res) => {
            setMessages(res.messages)
        })
    }

    const SendMessage = (text) => {
        socket.emit("send_message", text,(res) => {

        })
    }

    return {
        State,
        Rooms,
        Messages,
        CurrentRoom,
        Pending,
        CreateRoom,
        JoinRoom,
        GetRoomMessages,
        SendMessage,
        DeleteRoom,
        EditRoom,
        RepositionRoom,
        GetRooms
    }
}

export default useRoom