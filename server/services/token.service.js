// Packages
const jwt = require('jsonwebtoken')

// config
const config = require('../config/config')

// Models
const { User } = require('../models')

const tokenCheck = async (token) => {

    // 2) Check if token exist
    if (!token) {
        return false
    }

    // 3) Token verification
    try {
        var decoded = await jwt.verify(token, config.jwt.secret)
    } catch (error) {
        return false
    }

    // 4) Extract user data from database
    const currentUser = await User.findById(decoded.sub);

    // 5) Check if user does not exist
    if (!currentUser) {
        return false
    }

    // 6) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return false
    }

    return currentUser
}

module.exports = {
    tokenCheck
}