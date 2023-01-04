const mongoose = require("mongoose")


const TokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    expires: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},{
    timestamps:true
})

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

TokenSchema.post("save", handleError)
TokenSchema.post("update", handleError)
TokenSchema.post("findOneAndUpdate", handleError)
TokenSchema.post("insertMany", handleError)

module.exports = mongoose.model('Token', TokenSchema)