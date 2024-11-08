const express= require('express')
const app= express()
require('dotenv').config()
const errorHandler=require('./middleware/errorHandler')
const connectDB = require('./Config/dbConnection')
const asyncHandler=require('express-async-handler')
const port= process.env.PORT

//middlewares
app.use(express.json())
app.use(errorHandler)
app.use(express.urlencoded({extended:true}))

app.use('/api/contacts',  require('./routes/contactRoutes'))

app.use('/api/users',     require('./routes/userRoutes'))
////app.use(asyncHandler)
//iIc21TvSraWeRDd1
//mongodb+srv://tinegachris797:iIc21TvSraWeRDd1@cluster0.yp6oi.mongodb.net/
//database 
//
connectDB()


app.listen(port, console.log(`server listening on ${port}`))