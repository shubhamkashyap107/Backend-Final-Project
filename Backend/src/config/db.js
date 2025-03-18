const mongoose = require("mongoose")

function connectDB()
{
    console.log(hi)
    return mongoose.connect(process.env.DB_URL)
}




module.exports = {
    connectDB
}