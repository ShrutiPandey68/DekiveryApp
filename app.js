const express = require('express');
const app = express();
const connectDB = require('./db');
const orderRoutes = require('./src/routes/orderRoutes');
const deliveryBoyRoutes = require('./src/routes/deliveryBoyRoutes');
const cronJob = require('./src/cronJob');

connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for orders and delivery boys
app.use('/api/orders', orderRoutes);
app.use('/api/deliveryboys', deliveryBoyRoutes);

// Start the cron job
cronJob.start(); // Assuming start function is defined in cronJob.js

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
