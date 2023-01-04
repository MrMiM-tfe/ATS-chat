import { useEffect, useState } from "react"
import Socket from "../Socket/"

const socket = Socket("user")

const useUser = () => {

    // hooks
    const [Users, setUsers] = useState([])
    const [Pending, setPending] = useState(false)

    useEffect(() => {

        socket.on("connect", (a) => {
            console.log("connected");
        })

        socket.on("connect_error", (err) => {
            console.log(err);
        })

        socket.emit("get_all",(res) => {
            if (res.type === "Success") {
                setUsers(res.users)
            }
        })

        socket.on("update_users", ({users}) => {
            setUsers(users)
        })

    },[])

    const CreateUser = (data) => {
        socket.emit("create", data, (res) => {
            console.log(res);
        })
    }

    const EditUser = (user, data) => {
        setPending(true)
        socket.emit("edit_user", user, data, (res) => {
            console.log(res);
            setPending(false)
        })
    }

    const DeleteUser = (user) => {
        socket.emit("delete_user", user, (res) => {
            console.log(res);
        })
    }

    return {
        Users,
        Pending,
        CreateUser,
        DeleteUser,
        EditUser
    }
}

export default useUser