const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Establish connection to the MongoDB server
    await mongoose.connect('mongodb://localhost:27017/deliveryApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
