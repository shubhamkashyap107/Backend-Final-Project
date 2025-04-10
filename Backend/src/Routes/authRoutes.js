const express = require("express")
const router = express.Router()
const {User} = require("../models/user")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const { isLoggedIn } = require("../middlewares/isLoggedIn")


router.post("/signup" ,async(req, res) => {
    try{
        const{emailId, password, username} = req.body
        const flag = validator.isStrongPassword(password)
        if(!flag)
        {
            throw new Error("Please Enter a strong password")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        let createdUser = await User.insertOne({username, emailId, password : hashedPassword})
        const token = createdUser.getJWT()
        res.cookie("token", token)
        res.status(200).json({"msg" : "User registered successfully", data : createdUser})
    } catch(e)
    {
        res.status(400).json({"msg" : "User already exists"})
    }
})

router.post("/login", async(req, res) => {

    try {
        const{username, password} = req.body
        const FoundUser = await User.findOne({username})
        if(!FoundUser)
        {
            throw new Error("User does not exist")
        }
        const flag = await bcrypt.compare(password, FoundUser.password)
        if(flag)
        {
            // const token = jwt.sign({_id : FoundUser._id}, process.env.JWT_SECRET, {
            //     expiresIn : "7d"
            // })
            const token = FoundUser.getJWT()
            // console.log("OK")
            const{firstName, lastName, image, bio, username, DOB, _id} = FoundUser
            res.cookie("token", token).json({"msg" : "User logged in successfully", data : {
                firstName, lastName, image, bio, username, DOB, _id
            }})
        }
        else
        {
            res.status(401).json({"msg" : "Invalid Credentials"})
        }
    } catch (error) {
        res.json({"error" : "Please enter all the fields"})
    }
    
})

router.get("/logout", isLoggedIn ,async(req, res) => {
   try {
        res.cookie("token", null)
        res.status(200).json({"msg" : "User logged out"})
   } catch (error) {
        res.json({"msg" : error.msg})
    
   }
})



module.exports = {
    authRouter : router
}