const restaurantRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Restaurant = require('../models/restaurant')

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
  try {
    const {name, address, info, username, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const restaurant = new Restaurant({
      name,
      address,
      info,
      username,
      passwordHash
    })

    const savedRestaurant = await restaurant.save()

    res.status(201).json(savedRestaurant)
  } catch(error) {
    console.log(error.message)
    res.json({error: error.message})
  }
})

restaurantRouter.put('/:id', async (req, res) => {
  const {name, address, username, password} = req.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const restaurant = {
      name,
      address,
      info,
      username,
      passwordHash
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, restaurant, {new: true})

    res.status(201).json(updatedRestaurant)
  } catch(error) {
    console.log(error.message)
  }
})

module.exports = restaurantRouter
