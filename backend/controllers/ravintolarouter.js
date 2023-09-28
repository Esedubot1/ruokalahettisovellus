const ravintolaRouter = require('express').Router()

const Ravintola = require('../models/ravintola')

ravintolaRouter.get('/', async (req, res) => {
  const ravintolat = await Ravintola.find({})
  res.json(ravintolat)
})

ravintolaRouter.get('/:id', async (req, res) => {
  try {
    const ravintola = await Ravintola.findById(req.params.id)
    if (ravintola) {
      res.json(ravintola)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
  }
})

ravintolaRouter.post('/', async (req, res) => {
  const body = req.body

  try {
    /* const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id) */

    const restaurant = new Ravintola({
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

module.exports = ravintolaRouter