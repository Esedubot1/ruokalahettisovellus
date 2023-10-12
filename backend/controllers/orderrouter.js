const orderRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Order = require('../models/order')
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const Deliverer = require('../models/deliverer')

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

    const filtered = orders.filter((e) => e.restaurant === restaurant)

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
      products: body.products,
      status: 0
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
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'invalid token'})
    }

    const order = await Order.findById(req.params.id)
    const user = await User.findById(decodedToken.id)
    const restaurant = await Restaurant.findById(decodedToken.id)
    const deliverer = await Deliverer.findById(decodedToken.id)

    if (order.status === 0) {
      if (user && user.id === order.recipient) {
        order.products = body.products
      } else if (user) {
        return res.status(401).json({error: 'not your order'})
      }

      if (restaurant && restaurant.id === order.restaurant) {
        order.status = 1
      } else if (restaurant) {
        return res.status(401).json({error: 'wrong restaurant'})
      }
    } else if (order.status === 1) {
      if (deliverer && !order.deliverer) {
        order.deliverer = deliverer.id
        order.status = 2
      } else if (deliverer) {
        return res.status(401).json({error: 'order already has a deliverer'})
      }
    } else if (order.status === 2) {
      if (user && user.id === order.recipient) {
        order.status = 3
      } else if (user) {
        return res.status(401).json({error: 'not your order'})
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, order, {new: true})
  
    res.json(updatedOrder)
  } catch(error) {
    console.log(error.message)
  }
})

/* orderRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'token invalid'})
    }

    const restaurant = await Restaurant.findById(decodedToken.id)
    const product = await Product.findById(req.params.id)

    if (restaurant.id != product.restaurant) {
      return res.status(400).json({error: 'this user cannot modify the products of this restaurant'})
    }

    await Order.findByIdAndRemove(req.params.id)

    res.status(204).end()
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
}) */

module.exports = orderRouter
