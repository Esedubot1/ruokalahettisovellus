const productRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Product = require('../models/product')

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

    const filtered = products.filter((a) => a.restaurant === restaurant)

    res.json(filtered)
  } catch (error) {
    console.log(error.message)
  }
})

productRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    const product = new Product({
      name: body.name,
      price: body.price,
      restaurant: body.restaurant,
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

module.exports = productRouter