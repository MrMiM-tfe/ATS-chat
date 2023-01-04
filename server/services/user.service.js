// Models
const {User} = require("../models")

// Utils
const { HandleReturn } = require("../utils/handleRes")

exports.getAllUsers = async () => {
    // get all users
    const users = await User.find()

    return HandleReturn.ok({users})
}

exports.editUser = async (userId, editorId, data) => {


    const user = await User.findById(userId)

    const editorUser = await User.findById(editorId)

    // check permisions
    if (user?.id !== editorUser?.id && editorUser?.role !== "admin" && editorUser?.role !== "staff") {
        return HandleReturn.error("no permissions")
    }
    if (user?.role !== "admin" && data?.role !== "user" && editorUser?.role !== "admin") {
        return HandleReturn.error("no permissions")
    }

    try {
        const user = await User.findByIdAndUpdate(userId, data, {
            new: true,
            runValidators:true
        })
    
        return HandleReturn.ok({user})
    } catch (err) {
        return HandleReturn.error(err.message, err.statusCode)
    }
}

exports.deleteUser = async (userId, deletor) => {

    if (!userId){
        return HandleReturn.error("user id is requried")
    }

    // Get User
    const deletorUser = await User.findById(deletor)

    // Get room
    const user = await User.findById(userId)

    
    // Check permissions
    if (user?.role === "admin" && deletorUser?.id !== user?.id){
        return HandleReturn.error("no permissions")
    }
    if (user?.id != deletorUser?.id && deletorUser?.role != "admin" && deletorUser?.role != "staff"){
        return HandleReturn.error("no permissions")
    }
    
    await User.findByIdAndDelete(userId)

    return HandleReturn.ok({user})
}

exports.createUser = async (data, creatorId) => {

    const creator = await User.findById(creatorId)

    // check permisions
    if (creator?.role !== "admin") {
        return HandleReturn.error("no permissions you need to be admin")
    }

    const { name, username, email, password, role, address, phone} = data

    if (
        !name ||
        !username ||
        !email ||
        !password ||
        !role
      ) {
        return HandleReturn.error("fields Required")
      }

    // 1) Make admin role forbidden
    if (!['user', 'seller', 'admin'].includes(role)) {
        return HandleReturn.error("wrong role")
    }
    
    const passwordConfirmation = password
    
    // 2) Create new User
    const savingData = { name, username, email, password, passwordConfirmation, role, address, phone}

    try {
        const user = await User.create(savingData)

        // 4) Remove the password from the output
        user.password = undefined;

        return HandleReturn.ok({user})
    } catch (err) {
        return HandleReturn.error(err.message, err.statusCode)
    }
}