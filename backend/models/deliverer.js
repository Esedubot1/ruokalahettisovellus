const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const delivererSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

delivererSchema.plugin(uniqueValidator)

delivererSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Deliverer', delivererSchema)