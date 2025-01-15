const express = require('express')
const postRoute = require('./routes/post.route')
const authRoute = require('./routes/auth.route')
const app =express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use("/api/post" ,postRoute)
app.use("/api/auth" ,authRoute)


app.listen(3000, ()=> console.log("Server is listning "));