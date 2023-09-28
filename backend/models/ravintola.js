const mongoose = require('mongoose')

const ravintolaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: Array
})

ravintolaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Ravintola', ravintolaSchema)