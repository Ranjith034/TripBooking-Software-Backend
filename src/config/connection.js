const mongoose = require("mongoose")

const connection = () => {
    try{
    mongoose.connect(process.env.MANGO_DB_URL)
    console.log("Mongodb Connected Successfully");
    }
    catch(err){
        console.log(`${err}`);
        
    }
    
}

module.exports = connection