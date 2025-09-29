const express = require("express")

const controllers = require("../../controllers/User/confirmbookings.controller")

const { verifyToken } = require("../../middlewares/generateTocken")

const router = express.Router()


router.get("/confirmbookings", controllers.getAllconfirmBookings)

router.get("/confirmbooking", verifyToken, controllers.getconfirmBookingById)

router.post("/confirmbooking", controllers.createconfirmBooking)


module.exports = router