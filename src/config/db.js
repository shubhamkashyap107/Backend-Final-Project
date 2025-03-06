const dbUrl = process.env.dbUrl
const mongoose = require("mongoose")


function connectDB()
{
    return mongoose.connect(dbUrl)
}



module.exports = connectDB