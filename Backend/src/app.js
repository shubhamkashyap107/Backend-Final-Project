const express = require("express")
const app = express()
const {authRouter} = require("./Routes/authRoutes")
const {profileRouter} = require("./Routes/profileRoute")
const {connectionRequestRouter} = require("./Routes/connectionRoutes")
const {userRouter} = require("./Routes/userRoutes")
const {connectDB} = require("./config/db")
const cookieParser = require('cookie-parser')
require("dotenv").config() // process.env.PORT process.env.DB_URL

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

app.use(express.json()) // parses req.body
app.use(cookieParser()) // parses
app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/connection", connectionRequestRouter)
app.use("/user", userRouter)