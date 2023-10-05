const restaurantRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Restaurant = require('../models/restaurant')
const User = require('../models/user')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }  
  return null
}

restaurantRouter.get('/', async (req, res) => {
  const restaurants = await Restaurant.find({})
  res.json(restaurants)
})

restaurantRouter.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (restaurant) {
      res.json(restaurant)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
  }
})

restaurantRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if(user.restaurant) {
      return res.status(400).json({error: 'this user already is already associated with a restaurant'})
    }

    const restaurant = new Restaurant({
      name: body.name,
      address: body.address,
      user: user.id
    })
    
    const savedRestaurant = await restaurant.save()
    user.restaurant = savedRestaurant.id
    await user.save()

    res.status(201).json(savedRestaurant)
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
})

restaurantRouter.put('/:id', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const restaurant = {
      name: body.name,
      address: body.address,
      user: user
    }

    if(!Restaurant.findById(req.params.id).user === user) {
      return res.status(401).json({
        error: 'cannot be modified by this user'
      })
    }
  
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, restaurant, {new: true})
  
    res.json(updatedRestaurant)
  } catch(error) {
    console.log(error.message)
  }
})

restaurantRouter.delete('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)

    if(!user.restaurant) {
      return res.status(400).json({error: 'this user is not associated with a restaurant'})
    }

    await Restaurant.findByIdAndRemove(user.restaurant)
    user.restaurant = null
    await user.save()

    res.status(204).end()
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
})

module.exports = restaurantRouter