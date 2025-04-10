const express = require("express")
const { isLoggedIn } = require("../middlewares/isLoggedIn")
const { Chat } = require("../models/chat")
const router = express.Router()



router.get("/:receiverId", isLoggedIn, async(req, res) => {
   
   try {
    const {receiverId} = req.params
    const senderId = req.ID

    const foundChat = await Chat.findOne({participants : {$all : [senderId, receiverId]}})
    console.log(foundChat)

    if(!foundChat)
    {
        res.json([])
    }
    else
    {
        res.json(foundChat)
    }
   } catch (error) {
    res.json([])
   } 
})









module.exports = {
    chatRoutes : router
}