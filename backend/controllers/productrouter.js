const productRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Product = require('../models/product')
const Restaurant = require('../models/restaurant')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }  
  return null
}

productRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
  }
})

productRouter.get('/from/:restaurant', async (req, res) => {
  const restaurant = req.params.restaurant

  try {
    const products = await Product.find({})

    const filtered = products.filter((e) => e.restaurant === restaurant)

    res.json(filtered)
  } catch (error) {
    console.log(error.message)
  }
})

productRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'invalid token'})
    }

    const restaurant = await Restaurant.findById(decodedToken.id)

    const product = new Product({
      name: body.name,
      price: body.price,
      restaurant: restaurant.id,
      img: body.img
    })
    
    const savedProduct = await product.save()

    res.status(201).json(savedProduct)
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
})

productRouter.put('/:id', async (req, res) => {
  const body = req.body

  try {
    const product = {
      name: body.name,
      price: body.price,
      restaurant: body.restaurant,
      img: body.img
    }
  
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {new: true})
  
    res.json(updatedProduct)
  } catch(error) {
    console.log(error.message)
  }
})

productRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({error: 'token invalid'})
    }

    const restaurant = await Restaurant.findById(decodedToken.id)
    const product = await Product.findById(req.params.id)

    if(!restaurant.id === product.restaurant) {
      return res.status(400).json({error: 'this user cannot modify the products of this restaurant'})
    }

    await Product.findByIdAndRemove(req.params.id)

    res.status(204).end()
  } catch(error) {
    console.log(error.message)
    res.status(400).send(`${error.message}`)
  }
})

module.exports = productRouter