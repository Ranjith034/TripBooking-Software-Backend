const mongoose = require("mongoose")


const RegisterSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true
    },
    state:{
    type:String,
    
    },
    district:{
        type:String,

    }

},{timestamps:true})

const Register = mongoose.model('Register', RegisterSchema)

module.exports = Register