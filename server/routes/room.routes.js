const express = require("express")
const router = express.Router()

// Controllers
const { roomController } = require('../controllers')

// middlewares
const { protect } = require("../middlewares/auth")

router.get('/', roomController.getAllRoooms)

router.use(protect)

router.post('/', roomController.createRoom)

module.exports = router