const express = require("express")

const controller = require("../../controllers/Admin/package.controller")

const upload = require("../../middlewares/file")

const router = express.Router()

router.post('/package', upload, controller.packegecontroller)
router.get('/package',controller.getPackageById)
router.get('/packages',controller.getPackages)
router.put('/package', upload ,controller.updatePackage)
router.delete('/package', controller.deletePackage)


module.exports = router