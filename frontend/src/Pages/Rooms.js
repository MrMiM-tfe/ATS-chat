import { useContext, useEffect, useRef, useState } from "react"
import { Stack, Form, Image, Container, Button, Dropdown } from "react-bootstrap"
import { ThreeDotsVertical, Send, PlusCircleFill } from "react-bootstrap-icons"
import {Link} from "react-router-dom"
import useRoom from "../Hooks/useRoom"

import { AuthContext } from "../Contexts/AuthContext"

// Styles
import "../Styles/Room.css"

const Rooms = () => {

    const { User } = useContext(AuthContext)

    const [searchInput, setSearchInput] = useState("")
    const [messageInput, setMessageInput] = useState("")

    const chat = useRef(null)

    const {
        State,
        Rooms,
        Messages,
        JoinRoom,
        GetRoomMessages,
        SendMessage,
        DeleteRoom,
        CurrentRoom
    } = useRoom()

    const HadleRoomClick = (room) => {
        JoinRoom(room)
        GetRoomMessages(room)
    }

    useEffect(() => {
        chat.current.scrollTop = chat.current?.scrollHeight
    }, [Messages])

    const HandleSend = (e) => {
        e.preventDefault()

        SendMessage(messageInput)
        setMessageInput("")
    }

    const HandleDeleteRoom = (room) => {
        DeleteRoom(room)
    }

    return (
        <div className="rooms-page">
            <div className="chating-panel container-fluid">
                <div className="sections row">
                    <div className="sec-left col-3 p-0">
                        <div className="search-box">
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value)
                                }}
                            />
                        </div>
                        <Stack className="rooms">
                            {Rooms.map(room => (
                                <div className="room p-2" key={room._id} onClick={() => {
                                    HadleRoomClick(room.slug)
                                }
                                }>
                                    <strong className="room-name">{room.name}</strong>
                                    <p>{room.des}</p>
                                </div>
                            ))}
                        </Stack>
                        <div className="new-room rounded-circle">
                            <Link to="/new-room">
                                <PlusCircleFill/>
                            </Link>
                        </div>
                    </div>
                    <div className="sec-right col-9 p-0">
                        <Container>
                            <div className="head row">
                                {CurrentRoom && <Image src="/assets/imgs/user-profile.webp" roundedCircle className="col-2" />}
                                <div className="room-info col-8">
                                    <strong>{CurrentRoom?.name ?? "Enter room..."}</strong>
                                    {CurrentRoom && (<p>MrMiM, plusboy, reza, ...</p>)}
                                </div>
                                <div className="state col-1">
                                    {State}
                                </div>
                                <div className="menu col">
                                    <Dropdown>
                                        <Dropdown.Toggle id="room-menu-dropdown">
                                            <ThreeDotsVertical/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item as="button" bsPrefix="dropdown-delete" onClick={()=> HandleDeleteRoom(CurrentRoom.slug)} >delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Container>
                        <div className="chat" ref={chat}>
                            <Stack className="messages">
                                {Messages.map(message => (
                                    <div key={message._id} className={`message ${message.auther._id === User._id ? "my" : "others"}-message container-fluid`}>
                                        <div className="profile">
                                            <Image src="/assets/imgs/user-profile.webp" roundedCircle />
                                        </div>
                                        <div className="message-box align-middle">
                                            <div className="user-info">
                                                {message.auther.name}
                                            </div>
                                            <div className="message-content">
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Stack>
                        </div>
                        <div className="send-message container">
                            <form className="row" onSubmit={HandleSend}>
                                <div className="input col-10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Message..."
                                        value={messageInput}
                                        onChange={(e) => {
                                            setMessageInput(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="send col-2">
                                    <Button variant="primary" type="submit">
                                        <Send />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rooms;