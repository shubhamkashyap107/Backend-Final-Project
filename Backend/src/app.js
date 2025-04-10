const express = require("express")
const app = express()
const {authRouter} = require("./Routes/authRoutes")
const {profileRouter} = require("./Routes/profileRoute")
const {connectionRequestRouter} = require("./Routes/connectionRoutes")
const {userRouter} = require("./Routes/userRoutes")
const {connectDB} = require("./config/db")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const http = require("http")
require("dotenv").config() // process.env.PORT process.env.DB_URL
const fn = require("socket.io")
const { Chat } = require("./models/chat")
const {chatRoutes} = require("./Routes/chatRoutes")


const server = http.createServer(app)

const io = fn(server, {
    cors : {
        origin : "http://localhost:5173"
    }
})


io.on("connection", (socket) => {
    socket.on("joinRoom", ({senderId, receiverId}) => {
        const roomID = [senderId , receiverId].sort().join("_")
        socket.join(roomID)


        socket.on("sendMsg", async({message, senderId, receiverId}) => {
            // console.log(message)
            
            let foundChat = await Chat.findOne({participants : {$all : [senderId, receiverId]}})
    
            if(!foundChat)
            {
                foundChat = new Chat({
                    participants : [senderId, receiverId],
                    messages : []
                })
            }


            foundChat.messages.push({senderId, text : message})

            await foundChat.save()
    
            io.to(roomID).emit("receiveMsg", {message, senderId})
        })
    })

    
})


connectDB()
.then(() => {
    console.log("DB Connected")
    server.listen(process.env.PORT, () => {
        console.log("Server Running")
    })
})
.catch(() => {
    console.log("DB not Connected")
})


app.use(cors({
    credentials : true,
    origin : "http://localhost:5173"
}))
app.use(express.json()) // parses req.body
app.use(cookieParser()) // parses
app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/connection", connectionRequestRouter)
app.use("/user", userRouter)
app.use("/chat", chatRoutes)
