// Services
const { userService } = require("../services")

// Utils
const { Res } = require("../utils/handleRes")

module.exports = (socket) => {

    const getUsers = async (res) => {
        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_all)")
        }

        const users = await userService.getAllUsers()
        Res.Success(res, {users})
    }

    const editUser = async (userId, data, res) => {
        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (get_all)")
        }

        const user = await userService.editUser(userId, socket.user.id, data)

        const users = await userService.getAllUsers()
        
        socket.nsp.emit("update_users", users)

        return Res.Success(res, {user})
    }

    const deleteUser = async (userId, res) => {
        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (delete_user)")
        }

        const {user} = await userService.deleteUser(userId, socket.user.id)

        if (!user) {
            return Res.Error(res, "user not deleted")
        }

        const users = await userService.getAllUsers()

        socket.nsp.emit("update_users", users)

        return Res.Success(res, {user})
    }

    const createUser = async (data, res) => {
        // check if res if function
        if (Res.Check(res)){
            return socket.emit("error", "callback is required on (delete_user)")
        }

        const user = await userService.createUser(data, socket.user.id)

        if (!user) {
            return Res.Error(res, "user not created")
        }

        const users = await userService.getAllUsers()

        socket.nsp.emit("update_users", users)

        return Res.Success(res, {user})
    }

    socket.on("get_all", getUsers)
    socket.on("create", createUser)
    socket.on("delete_user", deleteUser)
    socket.on("edit_user", editUser)
}