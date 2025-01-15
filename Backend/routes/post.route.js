const express = require('express')
const router = express.Router()

router.get("/test" ,(req,res)=>{
    res.send("post route testing")
})

module.exports = router