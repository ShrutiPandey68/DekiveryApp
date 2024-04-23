const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('DeliveryBoy', deliveryBoySchema);
