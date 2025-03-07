const express = require("express")
const router = express.Router()
const{ User }= require("../models/userSchema")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');


router.post("/signup", async(req, res) => {
    try {
        const{email, username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.insertOne({
            username, email, password : hashedPassword
        })
        res.status(200).json({"msg" : "User registered successfully"})
    
    } catch (error) {
        res.status(500).send("Please enter all the required fields")
    }
  
})



router.post("/login", async(req, res) => {
    const{ username, password} = req.body
    const foundUser = await User.findOne({username : username})

    let pw = foundUser.password
    let flag = await bcrypt.compare(password, pw)

    if(flag)
    {
        const token = jwt.sign({_id : foundUser._id}, "secretstring")
        res.cookie("token" , token, {
            maxAge : 2629746000
        })
        res.send("User logged in")

    }
    else
    {
        res.send("Invalid Credentials")
    }

})


router.get("/feed", (req, res) => {
    const{token} = req.cookies

    const data =  jwt.verify(token, "secretstring")

    const user = User.findById(data._id)


    if(user)
    {
        res.send("data")
    }
    else
    {
        res.send("Please log in / User not found")
    }
})








module.exports = router