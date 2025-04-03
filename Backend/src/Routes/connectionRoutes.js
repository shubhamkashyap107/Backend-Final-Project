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
        
        // await ConnectionRequest.insertOne({
        //     fromUsedId : req.User._id,
        //     toUserId : id,
        //     status : status
        // })

        const newReq = new ConnectionRequest({
            fromUsedId : req.User._id,
                toUserId : id,
                status : status
        })
        await newReq.save()
        res.status(201).json({"msg" : "OKAY"})
    } catch (error) {
        res.json({"error" : error.message})
        
    }
})

router.patch("/review/:status/:connectionRequestID", isLoggedIn , async(req, res) => {
    try {
        const {status} = req.params
        const {connectionRequestID} = req.params
        
        const foundReq = await ConnectionRequest.findById({_id : connectionRequestID})
        if(!foundReq)
        {
            throw new Error("Invalid Request")
        }
        if(!foundReq.status == "interested")
        {
            throw new Error("Not a valid operation")
        }
        if(!["accepted", "rejected"].includes(status))
        {
            throw new Error("Not a valid status")
        }
        if(!foundReq.toUserId.equals(req.User._id))
        {
            throw new Error("Not authorised for this action")
        }
        // ConnectionRequest.findByIdAndUpdate(connectionRequestID, {status })
        foundReq.status = status
        await foundReq.save()

        res.status(201).json({msg : `request ${status}`})
    } catch (error) {
        res.json({error : error.message})
    }
})




module.exports = {
    connectionRequestRouter : router
}