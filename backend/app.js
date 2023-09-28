require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const ravintolaRouter = require('./controllers/ravintolarouter')
const userRouter = require('./controllers/ravintolarouter')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

app.use('/api/ravintolat', ravintolaRouter)
app.use('/api/users', userRouter)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

module.exports = app