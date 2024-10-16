const Order = require('../models/orderModel');
const DeliveryBoy = require('../models/deliveryBoyModel');

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('deliveryBoy');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update an order and assign a delivery boy
exports.updateOrder = async (req, res) => {
  try {
    const { deliveryBoyId } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Assign delivery boy to order
    const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
    if (!deliveryBoy || !deliveryBoy.isAvailable) {
      return res.status(400).json({ error: 'Invalid or unavailable delivery boy' });
    }

    order.deliveryBoy = deliveryBoyId;
    order.status = 'Assigned';
    await order.save();

    // Mark the delivery boy as not available
    deliveryBoy.isAvailable = false;
    await deliveryBoy.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
