const express = require("express")
const router = express.Router()

// Routes
const MainRoutes    = require('./main.routes')
const Authoutes     = require("./auth.routes")
const RoomRoutes    = require("./room.routes")

router.use(MainRoutes)
router.use("/auth", Authoutes)
router.use('/room', RoomRoutes)

module.exports = router