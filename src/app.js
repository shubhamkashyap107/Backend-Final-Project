const express = require("express")
const app = express()
require('dotenv').config()
const connectDB = require("./config/db")

app.use(express.json())

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







