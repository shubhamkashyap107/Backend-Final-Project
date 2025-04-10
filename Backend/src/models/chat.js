const { default: mongoose } = require("mongoose");


const msgSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    text : {
        type : String,
        trim : true,
        minLength : 1,
        required : true
    }
}, {timestamps : true})

const chatSchema = new mongoose.Schema({
    participants : [{type : mongoose.Schema.Types.ObjectId, required : true}],
    messages : [msgSchema]
})


const Chat = mongoose.model("Chat", chatSchema)



module.exports = {
    Chat
}