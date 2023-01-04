const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    room:{
        type:mongoose.Types.ObjectId,
        ref:"Room",
        required:true
    },
    auther:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type: String,
        required: true
    }
},
{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: true
})

MessageSchema.index({ room: 1 })

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

MessageSchema.post("save", handleError)
MessageSchema.post("update", handleError)
MessageSchema.post("findOneAndUpdate", handleError)
MessageSchema.post("insertMany", handleError)


module.exports = mongoose.model("Message", MessageSchema)