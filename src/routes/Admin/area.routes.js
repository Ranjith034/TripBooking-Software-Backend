const express = require("express")

const controller = require("../../controllers/Admin/area.controller")

const upload = require("../../middlewares/file")

const router = express.Router()

router.post("/area", upload, controller.areacontroller)
router.put("/area", upload, controller.updateAreaController)
router.get("/area", controller.getAllArea)
router.delete("/area", controller.deletearea)


module.exports = router