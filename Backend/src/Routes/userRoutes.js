const express = require("express")
const router = express.Router()
const{isLoggedIn} = require("../middlewares/isLoggedIn")
const{ConnectionRequest} = require("../models/connectionRequest")



router.get("/connection-requests", isLoggedIn, async(req, res) => {
    try {
        const allRequests = await ConnectionRequest.find({toUserId : req.User._id})
        res.json(allRequests)
    } catch (error) {
        res.json({error : error.message})
    }
})

router.get("/connections", isLoggedIn , async(req, res) => {
    try {
        let allConnections = await ConnectionRequest.find({
            $and : [
                {status : "accepted"},
                {$or : [
                    {toUserId : req.User._id},
                    {fromUsedId : req.User._id}
                ]}
            ]    
        }).populate({path : "fromUsedId", select : "username firstName lastName interests"})
        res.json(allConnections)
    } catch (error) {
        res.json({"error" : error.message})
    }
})





module.exports = {
    userRouter : router
}