const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const Deliverer = require('../models/deliverer') 

/* Kirjautuu sisään asiakkaana */
loginRouter.post('/user', async (req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({username})

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({token, username: user.username, id: user._id})
})

/* Kirjautuu sisään ravintolana */
loginRouter.post('/restaurant', async (req, res) => {
  const {username, password} = req.body

  const user = await Restaurant.findOne({username})
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({token, username: user.username, id: user._id})
})

/* Kirjautuu sisään kuljettajana */
loginRouter.post('/deliverer', async (req, res) => {
  const {username, password} = req.body

  const user = await Deliverer.findOne({username})

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({token, username: user.username, id: user._id})
})

module.exports = loginRouter