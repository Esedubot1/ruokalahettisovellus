const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
  }
})

userRouter.post('/', async (req, res) => {
  try {
    const {username, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch(error) {
    console.log(error.message)
  }
})

userRouter.put('/:id', async (req, res) => {
  const {username, password, restaurant} = req.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = {
      username,
      passwordHash,
      restaurant
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {new: true})

    res.status(201).json(updatedUser)
  } catch(error) {
    console.log(error.message)
  }
})

module.exports = userRouter