const orderRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Order = require('../models/order')
const User = require('../models/user')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }  
  return null
}

orderRouter.get('/', async (req, res) => {
  const orders = await Order.find({})
  res.json(orders)
})

orderRouter.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
  }
})

orderRouter.get('/from/:restaurant', async (req, res) => {
  const restaurant = req.params.restaurant

  try {
    const orders = await Order.find({})

    const filtered = orders.filter((a) => a.restaurant === restaurant)

    res.json(filtered)
  } catch (error) {
    console.log(error.message)
  }
})

orderRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'invalid token'})
    }

    const user = await User.findById(decodedToken.id)

    const order = new Order({
      recipient: user.id,
      restaurant: body.restaurant,
      products: body.products
    })
    
    const savedOrder = await order.save()

    res.status(201).json(savedOrder)
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
})

orderRouter.put('/:id', async (req, res) => {
  const body = req.body

  try {
    const order = {
      recipient: body.user,
      restaurant: body.restaurant,
      products: body.products,
      deliverer: body.deliverer
    }
  
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, order, {new: true})
  
    res.json(updatedOrder)
  } catch(error) {
    console.log(error.message)
  }
})

module.exports = orderRouter