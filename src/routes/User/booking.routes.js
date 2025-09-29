const express = require("express")

const controllers = require("../../controllers/User/bookings.controllers")

const { verifyToken } = require("../../middlewares/generateTocken")

const router = express.Router()


router.get("/bookings", controllers.getAllBookings)

router.get("/booking", verifyToken, controllers.getBookingById)

router.post("/booking", verifyToken ,controllers.createBooking)

router.put("/booking",  controllers.updateBooking)




module.exports = router