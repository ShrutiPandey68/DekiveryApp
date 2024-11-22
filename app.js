var express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require('./db');
const orderRoutes = require('./src/routes/orderRoutes');
const deliveryBoyRoutes = require('./src/routes/deliveryBoyRoutes');
const cronJob = require('./src/cronJob');

connectDB();
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors(corsOptions));
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
