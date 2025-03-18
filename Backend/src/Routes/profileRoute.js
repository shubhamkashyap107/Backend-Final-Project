const express = require("express")
const router = express.Router()
const{isLoggedIn} = require("../middlewares/isLoggedIn")
const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const validator = require("validator")


router.get("/", isLoggedIn ,async(req, res) => {
   try {
    // const{id} = req.params
    // const FoundUser = await User.findById({_id : id})
    const FoundUser = req.User
    if(!FoundUser)
    {
        throw new Error("User does not exist")
    }
    res.status(200).json(FoundUser)
   } catch (error) {
    res.json({"msg" : error.message})
   }
})


router.patch("/edit" , isLoggedIn, async(req, res) => {
    try {
        const{firstName, lastName, username, DOB, interests} = req.body
        const id = req.ID
        await User.findByIdAndUpdate({_id : id}, {firstName, lastName, username,DOB, interests }, 
            {runValidators : true})
        res.json({"msg" : "User updated successfully"})
    } catch (error) {
        res.json({"error" : error.message})
    }
})

router.patch("/edit/password", isLoggedIn, async(req ,res) => {
   try {
    const{existingPassword, newPassword} = req.body
    const foundUser = req.User
    const flag = await bcrypt.compare(existingPassword, foundUser.password)
    if(!flag)
    {
        throw new Error("Incorrect password");
    }
    if(existingPassword == newPassword)
    {
        throw new Error("New password cannot be same as existing password");
    }
    const isStrong = validator.isStrongPassword(newPassword)
    if(!isStrong)
    {
        throw new Error("Please enter a strong password")
    }
    let hashedPassword = await bcrypt.hash(newPassword, 10)
    await User.findByIdAndUpdate(req.ID, {password : hashedPassword}, {runValidators : true})
    res.json({"msg" : "Password updated successfully"})
   } catch (error) {
    res.json({"error" : error.message})
    
   }
})







module.exports = {
    profileRouter : router
}