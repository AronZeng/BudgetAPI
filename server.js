const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const usersRouter = require('./routes/users')



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error' , (error) => console.error(error))
db.once('open', () => console.log('Connected to mongoDB'))

//tells Express that it should accept json
//.use is middleware that allows us to run code when server gets a request but before it gets passed to its route
app.use(express.json())
app.use('/users', usersRouter)
app.listen(3000, () => console.log("Server Initiated"))