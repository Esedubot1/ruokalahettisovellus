require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const restaurantRouter = require('./controllers/restaurantrouter')
const userRouter = require('./controllers/userrouter')
const delivererRouter = require('./controllers/delivererrouter')
const loginRouter = require('./controllers/loginrouter')
const productRouter = require('./controllers/productrouter')
const orderRouter = require('./controllers/orderrouter')

app.use(cors())
app.use(express.json())

app.use('/api/restaurants', restaurantRouter)
app.use('/api/users', userRouter)
app.use('/api/deliverers', delivererRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

module.exports = app