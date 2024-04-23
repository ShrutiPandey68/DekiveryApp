const Order = require('../models/orderModel');
const assignOrdersToDeliveryBoys = require('../assignOrders');
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order({
    orderId: req.body.orderId,
    quantity: req.body.quantity
  });

  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    await assignOrdersToDeliveryBoys();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (req.body.assignedTo) {
      // Assign the order to a delivery boy
      await order.assignOrderToDeliveryBoy(req.body.assignedTo);
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
