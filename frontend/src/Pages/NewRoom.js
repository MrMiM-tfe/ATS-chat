import { useEffect, useState } from "react";
import useRoom from "../Hooks/useRoom";
import useRoomAPI from "../Hooks/useRoomAPI";

const NewRoom = () => {

    const { CreateRoom } = useRoom()

    const [Name, setName] = useState("")
    const [Des, setDes] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: Name,
            des: Des
        }

        CreateRoom(data)
    }

    return (
        <div className="new-room-page container mt-4">
            <h2>Ceate New Room</h2>
            <form className="from-group" onSubmit={handleSubmit}>
                <div className="room-name">
                    <label htmlFor="name">Room name</label>
                    <input type="text" className="form-control" id="name" placeholder="room name"
                    value={Name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    />
                </div>
                <div className="room-desc mt-3">
                    <label htmlFor="des">Room Description</label>
                    <input type="text" className="form-control" id="des" placeholder="room des"
                    value={Des}
                    onChange={(e) => {
                        setDes(e.target.value)
                    }}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">create room</button>
            </form>
        </div>
    );
}
 
export default NewRoom;