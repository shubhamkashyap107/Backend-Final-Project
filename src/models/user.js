const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        minLength : 2,
        maxLength : 15
    },
    lastName : {
        type : String,
        trim : true,
        minLength : 2,
        maxLength : 15
    },
    emailId : {
        required : true,
        lowercase : true,
        unique : true,
        type : String,
        trim : true,
        minLength : 10,
        maxLength : 40,
        validate(val)
        {
            const flag = validator.isEmail(val);
            if(!flag)
            {
                throw new Error("Please enter a valid Email")
            }
        }
    },
    username : {
        unique : true,
        required : true,
        type : String,
        trim : true,
        minLength : 6,
        maxLength : 15
    },
    password : {
        type : String,
        trim : true,
        minLength : 8,
        required : true,
    },
    DOB : {
        type : String,
        trim : true,
        validate(val)
        {
            const flag = validator.isDate(val)
            if(!flag)
            {
                throw new Error("Please Enter a valid Date")
            }
        }
    },
    // interests : [],
    image : {
        type : String,
        validate(value)
        {
            const flag = validator.isURL(value)
            if(!flag)
            {
                throw new Error("Not a valid URL")
            }
        }
    },
    bio : {
        type : String,
        minLength : 10,
        trim : true
    }
}, {timestamps : true})

userSchema.methods.getJWT = function(){
    const user = this

    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET, {
        expiresIn : "7d"
    })

    console.log(token)

    return token
}

const User = mongoose.model("User", userSchema)


module.exports = {
    User
}