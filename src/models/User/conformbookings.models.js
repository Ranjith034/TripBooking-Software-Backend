const mongoose = require("mongoose")


const ConfirmBookingSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    district:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:Number
    },
    persons:{
        required:true,
        type:Number
    },
    email:{
        required:true,
        type:String
    },
     pickup:{
        required:true,
        type:String
    },
     date:{
        required:true,
        type:String
    },
     state:{
        required:true,
        type:String
    },
    userId:{
       
        type:String 
    },
    approve:{
      type:String  
    },
    packagename:{
       type:String   
    }
},{timestamps:true})


const ConfirmBookings = mongoose.model('confirmBookings', ConfirmBookingSchema)

module.exports =  ConfirmBookings