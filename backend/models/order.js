const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  restaurant: {
    type: String,
    required: true
  },
  products: [
    {
      type: String
    }
  ],
  status: {
    type: Number
  },
  deliverer: {
    type: String
  }
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Order', orderSchema)
