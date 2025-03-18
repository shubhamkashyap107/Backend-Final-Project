const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    fromUsedId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
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

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionSchema)

module.exports = {
    ConnectionRequest
}