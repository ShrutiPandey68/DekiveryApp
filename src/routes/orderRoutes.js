const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const Order = require('../models/orderModel');
const assignOrdersToDeliveryBoys = require('../assignOrders');
// Route to get all orders
router.get('/', orderController.getAllOrders);

router.post('/create', async (req, res) => {
    try {
        const { quantity } = req.body;
        const newOrder = new Order({ quantity });
        await newOrder.save();
        await assignOrdersToDeliveryBoys();
      res.status(201).json(newOrder);
    } catch (error) {
      // Handle any errors that occur during order creation
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });
  

// Route to update an order
router.put('/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
