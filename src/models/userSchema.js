const mongoose = require("mongoose")
var validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        // required : true,
        trim : true,
        minLength : 2,
        maxLength : 15
    },
    lastName : {
        type : String,
        // required : true,
        trim : true,
        minLength : 2,
        maxLength : 15
    },
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minLength : 1,
        maxLength : 15,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minLength : 11,
        lowercase : true,
        validate(value){
            const flag = validator.isEmail(value)
            if(!flag)
            {
                throw new Error("Please enter a valid email")
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true
    },

    dateOfBirth : {
        type : String,
        // required : true,
        trim : true,
        validate(value){
            const flag = validator.isDate(value)
            if(!flag)
            {
                throw new Error("Please enter a valid date")
            }
        }
    }
}, {timestamps : true})



const User = mongoose.model("User", userSchema)


module.exports = {
    User
}

