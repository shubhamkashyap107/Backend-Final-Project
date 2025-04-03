const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    fromUsedId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status : {
        type : String,
        required : true,
        trim : true,
        enum : {
            values : ["interested", "ignored", "accepted", "rejected"],
            message : `{VALUE} is not a valid status`
        }
    }
})

const ConnectionRequest = mongoose.model("connectionrequest", connectionSchema)

module.exports = {
    ConnectionRequest
}