const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const assignOrdersToDeliveryBoys = require('../assignOrders');

// Get all orders
router.get('/', orderController.getAllOrders);

// Create a new order and assign delivery boys automatically
router.post('/create', async (req, res) => {
  try {
    const { quantity } = req.body;
    const newOrder = new Order({ quantity });
    await newOrder.save();

    // Assign available delivery boys
    await assignOrdersToDeliveryBoys();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update an order and assign a specific delivery boy
router.put('/:id', orderController.updateOrder);

// Delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
