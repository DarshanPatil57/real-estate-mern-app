require('dotenv').config();
const express = require('express')
const cors = require('cors')
const postRoute = require('./routes/post.route')
const authRoute = require('./routes/auth.route')
const testRoute = require('./routes/test.route')
const app =express()
const cookieParser = require('cookie-parser')

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/post" ,postRoute)
app.use("/api/auth" ,authRoute)
app.use("/api/test" ,testRoute)


app.listen(3000, ()=> console.log("Server is listning "));