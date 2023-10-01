require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const restaurantRouter = require('./controllers/restaurantrouter')
/* const userRouter = require('./controllers/userrouter') */

app.use(cors())
app.use(express.json())

app.use('/api/restaurants', restaurantRouter)
/* app.use('/api/users', userRouter) */

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

module.exports = app