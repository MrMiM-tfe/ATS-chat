import { useEffect, useState } from "react"
import { Link, Route, Routes, useParams } from "react-router-dom"
import useRoom from "../../Hooks/useRoom"

// Style
import "../../Styles/AdminRooms.css"

const Rooms = () => {

    // Hoocks
    const { Rooms, DeleteRoom, Pending, EditRoom, CreateRoom, RepositionRoom, GetRooms} = useRoom()
    const [Editing, setEditing] = useState(null)
    const [RoomName, setRoomName] = useState("")
    const [RoomSlug, setRoomSlug] = useState("")
    const [RoomDes, setRoomDes] = useState("")
    const [NewRoom, setNewRoom] = useState(null)

    const [RepoRoom, setRepoRoom] = useState(null)
    const [NextRoom, setNextRoom] = useState(null)

    useEffect(() => {
        GetRooms()
    }, [])

    useEffect(() => {
        if (!Pending){
            setEditing(null)
        }
    }, [Pending])

    const HandleEditSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: RoomName,
            slug: RoomSlug,
            des: RoomDes
        }
        
        EditRoom(Editing.slug, data)

        setEditing(null)
    }

    const HandleEdit = (room) => {
        setNewRoom(null)
        setEditing(room)
        setRoomName(room.name)
        setRoomDes(room.des)
        setRoomSlug(room.slug)
    }

    const HandleDelete = (room) => {
        DeleteRoom(room)
    }

    const HandleNewSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: RoomName,
            des: RoomDes
        }

        CreateRoom(data)
    }

    const HandleNew = () => {
        setRoomName('')
        setRoomDes('')
        setEditing(null)
        setNewRoom("new")
    }

    const dragStart = (id) => {
        setRepoRoom(id)
    }

    const dragEnter = (id) => {
        setNextRoom(id)
    }

    const dragEnd = () => {
        RepositionRoom(RepoRoom, NextRoom)
    }

    console.log(Rooms);

    return (
        <div className="rooms-page">
            {/* rooms list */}
            <div className="actions d-flex">
                <button className="btn btn-info" onClick={HandleNew}>New</button>
            </div>
            <div className="rooms-list container-fluid mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className="name-col">Name</th>
                            <th scope="col">Auther</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Rooms.map((room, i) => (
                            <tr key={room._id} draggable 
                                onDragStart={() => dragStart(room._id)}
                                onDragEnter={() => dragEnter(room._id)}
                                onDragEnd={dragEnd}
                            >
                                <th scope="row">{i}</th>
                                <td>{Editing?._id === room._id? (
                                    <form className="form-group" onSubmit={HandleEditSubmit}>
                                        <input className="from-control" placeholder="Room name" type="text"
                                            value={RoomName}
                                            onChange={(e) => {
                                                setRoomName(e.target.value)
                                            }}
                                            disabled={Pending}
                                            />
                                        <button className="btn btn-success btn-sm mx-1" type="submit">OK</button>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => setEditing(null)}>Cancel</button>
                                    </form>
                                ) : room.name}</td>
                                <td>{room.auther.name}</td>
                                <td>
                                    <button className="btn btn-light btn-sm" onClick={() => HandleEdit(room)}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => HandleDelete(room.slug)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* End rooms list */}

            {Editing && <div className="room-info mt-2">
                <form className="form-group" onSubmit={HandleEditSubmit}>
                    <div className="room-name">
                        <label htmlFor="name">Room Name</label>
                        <input className="form-control mb-1" type="text" id="name" placeholder="Room Name"
                        value={RoomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}
                        />
                    </div>
                    <div className="room-slug">
                        <label htmlFor="slug">Room slug</label>
                        <input className="form-control mb-1" type="text" id="slug" placeholder="Room Slug"
                        value={RoomSlug}
                        onChange={(e) => {
                            setRoomSlug(e.target.value)
                        }}
                        />
                    </div>
                    <div className="room-des mt-2">
                        <label htmlFor="des">Description</label>
                        <input className="form-control mb-1" type="text" id="des" placeholder="Description"
                        value={RoomDes}
                        onChange={(e) => {
                            setRoomDes(e.target.value)
                        }}
                        />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-success btn-sm mx-1" type="submit">OK</button>
                        <button className="btn btn-danger btn-sm mx-1" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                </form>
            </div>}

            {NewRoom && <div className="new-room-form">
                <form className="form-group" onSubmit={HandleNewSubmit}>
                    <div className="room-name">
                        <label htmlFor="name">Room Name</label>
                        <input className="form-control mb-1" type="text" id="name" placeholder="Room Name"
                        value={RoomName}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}
                        />
                    </div>
                    <div className="room-des mt-2">
                        <label htmlFor="des">Description</label>
                        <input className="form-control mb-1" type="text" id="des" placeholder="Description"
                        value={RoomDes}
                        onChange={(e) => {
                            setRoomDes(e.target.value)
                        }}
                        />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-success btn-sm mx-1" type="submit">OK</button>
                        <button className="btn btn-danger btn-sm mx-1" onClick={() => setNewRoom(null)}>Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    );
}
  
export default Rooms;