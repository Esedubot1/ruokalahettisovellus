const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  deliverer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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