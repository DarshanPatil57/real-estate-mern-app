const express = require('express')
const { user, admin } = require('../Controllers/test.controllers')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.get("/user" , verifyToken, user)

router.get("/admin" ,admin)

module.exports = router
