const express = require("express")
const app = express()
const {authRouter} = require("./Routes/authRoutes")
const {connectDB} = require("./config/db")
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
app.use("/auth", authRouter)