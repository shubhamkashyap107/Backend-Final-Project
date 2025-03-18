const express = require("express")
const app = express()
const {authRouter} = require("./Routes/authRoutes")
const {profileRouter} = require("./Routes/profileRoute")
const {connectionRequestRouter} = require("./Routes/connectionRoutes")
const {connectDB} = require("./config/db")
const cookieParser = require('cookie-parser')
require("dotenv").config()

connectDB()
.then(() => {
    console.log("DB Connected")
    app.listen(process.env.PORT, () => {
        console.log("Server Running")
    })
})
.catch(() => {
    console.log("DB not Connected")
})

app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/connection", connectionRequestRouter)