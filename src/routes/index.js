const express = require('express');
const router = express.Router();

// Import route modules
const deliveryBoyRoutes = require('./deliveryBoyRoutes');
const orderRoutes = require('./orderRoutes');

// Mount route modules
router.use('/deliveryboys', deliveryBoyRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
