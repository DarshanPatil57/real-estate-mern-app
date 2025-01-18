const express = require('express')
const router = express.Router()

const {verifyToken} = require('../middleware/verifyToken')

router.get("/" ,getPosts)
router.get("/:id" ,getPost)
router.get("/" , verifyToken ,addPosts)
router.get("/:id", verifyToken , updatePosts)
router.get("/:id" , verifyToken ,deletePosts)


module.exports = router