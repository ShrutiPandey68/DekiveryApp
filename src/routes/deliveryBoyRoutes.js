const express = require('express');
const router = express.Router();
const deliveryBoyController = require('../controllers/deliveryBoyController');
const DeliveryBoy = require('../models/deliveryBoyModel');

// Route to get all delivery boys
router.get('/', deliveryBoyController.getAllDeliveryBoys);

// Route to create a new delivery boy
router.post('/', deliveryBoyController.createDeliveryBoy);

// Route to update a delivery boy
router.put('/:id', deliveryBoyController.updateDeliveryBoy);

// Route to delete a delivery boy
router.delete('/:id', deliveryBoyController.deleteDeliveryBoy);

// Route to get orders assigned to a delivery boy
router.get('/:id/orders', deliveryBoyController.getAssignedOrders);

module.exports = router;
