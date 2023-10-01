const restaurantRouter = require('express').Router()

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
  const body = req.body

  try {
    const restaurant = new Restaurant({
      name: body.name,
      products: body.products
    })
    
    const savedRestaurant = await restaurant.save()

    res.status(201).json(savedRestaurant)
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
})

restaurantRouter.put('/:id', async (req, res) => {
  const body = req.body

  try {
    const restaurant = {
      name: body.name,
      products: body.products
    }
  
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, restaurant, {new: true})
  
    res.json(updatedRestaurant)
  } catch(error) {
    console.log(error.message)
  }
})

module.exports = restaurantRouter