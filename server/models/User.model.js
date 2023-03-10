const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please tell us your name"]
    },
    username:{
        type:String,
        minlength:4,
        trim:true,
        unique:[true, "Username has been taken"],
        required:[true, "Please enter Username"],
    },
    email:{
        type:String,
        required:[true, "Please enter Email"],
        unique:[true, "Email has been taken"],
        lowercase:true,
        trim:true,
        validate :[validator.isEmail, "Please enter valid Email"]
    },
    password:{
        type:String,
        required: [true, "Please enter Password"],
        trim:true,
        minlength:4,
        select: false
    },
    role:{
        type:String,
        enum:['user', 'staff', 'admin'],
        default: 'user'
    },
    isEmailVerified:{
        type:Boolean,
        default: false
    },
    passwordChangedAt: {
        type: Date
    },
    phone:{
        type:String
    },
    isPhoneVerified:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true,
    virtual: true
})

UserSchema.virtual('rooms', {
    ref: "Room",
    foreignField: "auther", // auther filed in Room Model
    localField: '_id' // _id filed in User Model
})

/**
 * check is password matches the user's password
 * @param {string} password
 * @return {Promise<boolean>}
 */
 UserSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Encrypt Password Using bcrypt
UserSchema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

// set passwordChangeAt to ther current time
UserSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000
    next()
})

// Check if user changed password after the token was issued
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const handleError = (err, doc, next) => {
    switch (err.name) {
        case "ValidationError":
            err.statusCode = 400
            break;
        case "MongoServerError":
            if (err.code === 11000){
                err.statusCode = 400
            }
            break;
        default:
            err.statusCode = 500
            break;
        }
    next(err)
}

UserSchema.post("save", handleError)
UserSchema.post("update", handleError)
UserSchema.post("findOneAndUpdate", handleError)
UserSchema.post("insertMany", handleError)

/**
 * @typedef User
 */
const User = mongoose.model('User', UserSchema)

module.exports = User