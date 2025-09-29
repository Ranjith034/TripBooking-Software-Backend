const express = require("express")

const controller = require("../../controllers/User/register.controllers")

const controllers = require("../../controllers/Admin/package.controller")

const { verifyToken } = require("../../middlewares/generateTocken")



const router = express.Router()

router.post('/user', controller.Registerdata)

router.post('/userlog', controller.logindata)

router.get('/user', verifyToken, controllers.getPackages)

router.get('/userone', verifyToken, controllers.getPackageById )

module.exports = router