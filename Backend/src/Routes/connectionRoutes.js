const express = require("express")
const { isLoggedIn } = require("../middlewares/isLoggedIn")
const { ConnectionRequest } = require("../models/connectionRequest")
const router = express.Router()


router.post("/send/:status/:id", isLoggedIn, async(req, res) => {
    try {
        const{status} = req.params
        const{id} = req.params
        if(req.User._id == id)
        {
            throw new Error("Invalid Operation")
        }
        // // interested, ignored
        // let foundRequest = await ConnectionRequest.find({toUserId : req.User._id, fromUsedId : id})
        // let foundRequest2 = await ConnectionRequest.find({fromUsedId : req.User._id, toUserId : id})
        let foundRequest = await ConnectionRequest.find({$or : [{toUserId : req.User._id, fromUsedId : id}, 
            {fromUsedId : req.User._id, toUserId : id}]})
        if(foundRequest.length)
        {
            throw new Error("Request already exists")
        }

        if(!["interested", "ignored"].includes(status))
        {
            throw new Error("Invalid Status")
        }
        
        await ConnectionRequest.insertOne({
            fromUsedId : req.User._id,
            toUserId : id,
            status : status
        })
        res.json({"msg" : "OKAY"})
    } catch (error) {
        res.json({"error" : error.message})
        
    }
})




module.exports = {
    connectionRequestRouter : router
}