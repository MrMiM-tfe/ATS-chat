import { useState } from "react"
import API from "../API"

const useRoomAPI = () => {

    const [Error, setError] = useState(null)
    const [Room, setRoom] = useState(null)

    const createRoom = async (data) => {
        const {res, err} = await API('room', "post", data)

        // check if response
        if (res) {
            setRoom(res.data.room)
        }
        if (err) {
            setRoom(null)
            setError(err);
        }
    }

    return {
        Error,
        Room,
        createRoom
    }
}

export default useRoomAPI