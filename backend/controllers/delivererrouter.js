const delivererRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Deliverer = require('../models/deliverer')

delivererRouter.get('/', async (req, res) => {
  const deliverers = await Deliverer.find({})
  res.json(deliverers)
})

delivererRouter.get('/:id', async (req, res) => {
  try {
    const deliverer = await Deliverer.findById(req.params.id)
    if (deliverer) {
      res.json(deliverer)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
  }
})

delivererRouter.post('/', async (req, res) => {
  try {
    const {username, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const deliverer = new Deliverer({
      username,
      passwordHash
    })

    const savedDeliverer = await deliverer.save()

    res.status(201).json(savedDeliverer)
  } catch(error) {
    console.log(error.message)
    res.json({error: error.message})
  }
})

delivererRouter.put('/:id', async (req, res) => {
  const {username, password} = req.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const deliverer = {
      username,
      passwordHash
    }

    const updatedDeliverer = await Deliverer.findByIdAndUpdate(req.params.id, deliverer, {new: true})

    res.status(201).json(updatedDeliverer)
  } catch(error) {
    console.log(error.message)
  }
})

module.exports = delivererRouter