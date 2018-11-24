const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, default: 1},
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order
