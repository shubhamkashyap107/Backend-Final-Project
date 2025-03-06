const express = require("express")
const router = express.Router()
const{ User }= require("../models/userSchema")


router.post("/signup", (req, res) => {
    const{firstName, lastName, email, username, password, dateOfBirth} = req.body

})






module.exports = router