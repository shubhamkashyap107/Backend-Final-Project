const jwt = require("jsonwebtoken")
const { User } = require("../models/user")


const isLoggedIn = async(req, res, next) => {
   try {
    const{token} = req.cookies // destructure the token
    const obj = jwt.verify(token, process.env.JWT_SECRET) // convert it to the original object
    const foundUser = await User.findOne({_id : obj._id}) // search in db for a existing user

    if(!foundUser)
    {
        throw new Error("Please log in")
    }
    req.User = foundUser
    req.ID = obj._id
    next()
   } catch (error) {
    res.json({"msg" : "Please log in"})
   }
}


module.exports = {
    isLoggedIn
}