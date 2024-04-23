// models/orderModel.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryBoy'
  }
});

module.exports = mongoose.model('Order', orderSchema);
