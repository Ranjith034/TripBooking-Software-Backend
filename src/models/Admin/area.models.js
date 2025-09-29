const mongoose = require("mongoose")

const AreaSchema = new mongoose.Schema({
    state:{
        required:true,
        type:String
    },
    location:{
        required:true,
        type:String
    },
    area:{
        required:true,
        type:String
    },
    originalname:{
        type:String
     },
     filename:{
         type:String
     },
     destination:{
         type:String
     }
},{timestamps:true})

const Area = mongoose.model("area", AreaSchema)

module.exports = Area