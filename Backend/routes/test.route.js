const express = require('express')
const { user, admin } = require('../Controllers/test.controllers')
const router = express.Router()

router.get("/user" , user)

router.get("/admin" ,admin)

module.exports = router