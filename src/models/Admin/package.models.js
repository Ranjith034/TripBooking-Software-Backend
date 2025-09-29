const mongoose = require("mongoose")

const packageSchema = new mongoose.Schema({
    state: {
        required: true,
        type: String
    },

    pickDays: {
        required: true,
        type: Number
    },

    Description: {
        required: true,
        type: String
    },
    Heading: {
        required: true,
        type: String
    },
    Ratings: {

        type: String
    },
    packagerName: {
        required: true,
        type: String
    },
    AddhotelLocation: {
        type: String
    },
    hotelname: {
        type: String
    },
    areas: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "area",
            required:true
        }
    ],

    originalname: {
        type: String
    },
    filename: {
        type: String
    },
    destination: {
        type: String
    }


}, { timestamps: true })

const Package = mongoose.model('package', packageSchema)

module.exports = Package