const mongoose = require("mongoose")
const slugify = require("slugify")

const RoomSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    slug:{
        type:String,
        unique:true
    },
    des:{
        type:String,
        default: "new room"
    },
    auther:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    next:{
        type:mongoose.Types.ObjectId,
        ref:"Room"
    }
},
{
    timestamps: true
})

RoomSchema.index({ slug: 1 })
RoomSchema.index({ next: 1 })

const preSave = function (next) {
    
    // Regular expression to check if string is a valid url slug
    const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

    if (this.isModified("slug") && regexExp.test(this.slug) && this.slug != ""){
        next()
    }else {
        this.slug = slugify(this.name)
        this.slug = this.slug.toLowerCase()
        next()
    }
}

const preUpdate = function (next) {
    // Regular expression to check if string is a valid url slug
    const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

    
    if (regexExp.test(this._update.slug) && this._update.slug != ""){
        next()
    }else {
        this._update.slug = slugify(this._update.name)
        this._update.slug = this._update.slug.toLowerCase()
        next()
    }
}

RoomSchema.pre("save", preSave)
RoomSchema.pre("findOneAndUpdate", preUpdate)

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

RoomSchema.post("save", handleError)
RoomSchema.post("update", handleError)
RoomSchema.post("findOneAndUpdate", handleError)
RoomSchema.post("insertMany", handleError)

module.exports = mongoose.model("Room", RoomSchema)