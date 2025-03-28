const express = require("express")
const router = express.Router()
const{isLoggedIn} = require("../middlewares/isLoggedIn")
const{ConnectionRequest} = require("../models/connectionRequest")
const { User } = require("../models/user")



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
        })


        allConnections = await Promise.all(allConnections.map((item) => {
            if(item.toUserId.equals(req.User._id))
            {
               return  item.populate("fromUsedId")
            }
            return  item.populate("toUserId")

        }))

        // console.log(allConnections)
        res.json(allConnections)
    } catch (error) {
        res.json({"error" : error.message})
    }
})


router.get("/", isLoggedIn , async(req, res) => {

   try {
    const{limit, skip} = req.query

    const allRequest = await ConnectionRequest.find({
     $or : [
         {fromUsedId : req.User._id},
         {toUserId : req.User._id}
     ]
    })

 
    let set = new Set()
 
    for(let item of allRequest)
    {
     set.add(item.toUserId)
     set.add(item.fromUsedId)
    }
 
 
    let allUsers = await User.find({
     $and : [
        { _id : {$nin : Array.from(set)}},
        { _id : {$ne : req.User._id}},
        {"firstName" : {$exists : true}},
        {"lastName" : {$exists : true}},
        {"bio" : {$exists : true}},
        {"DOB" : {$exists : true}},
        {"image" : {$exists : true}},
     ]
    }).limit(limit).skip(skip)
 
    res.json(allUsers)
   } catch (error) {
    res.json({"msg" : error.message})
   }


})




module.exports = {
    userRouter : router
}