const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("api for chating")
})

module.exports = router