
const express = require('express')
const { getUsers, getUser, updateUser, deleteUser } = require('../Controllers/user.controllers')
const {verifyToken} = require('../middleware/verifyToken')
const router = express.Router()


router.get("/" ,getUsers)

router.get("/:id" , verifyToken , getUser)

router.put("/:id" ,verifyToken , updateUser)

router.delete("/:id", verifyToken ,deleteUser)




module.exports =router