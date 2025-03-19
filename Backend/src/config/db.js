const mongoose = require("mongoose")

function connectDB()
{
    return mongoose.connect(process.env.DB_URL)
}




module.exports = {
    connectDB
}