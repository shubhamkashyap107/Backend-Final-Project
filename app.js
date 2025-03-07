const express = require("express")
const app = express()
require('dotenv').config()
const connectDB = require("./src/config/db")
const userRouter = require("./src/routes/userRoutes")
var cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())
app.use(userRouter)

connectDB()
.then(() => {
    console.log("DB Connected")
    app.listen(process.env.PORT, () => {
        console.log("Server connected to port " + process.env.PORT)
    })
})
.catch(() => {
    console.log("DB Connection Failed")
})







