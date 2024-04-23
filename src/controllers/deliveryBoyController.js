const DeliveryBoy = require('../models/deliveryBoyModel');
const Order = require('../models/orderModel');

exports.getAllDeliveryBoys = async (req, res) => {
  try {
    
    const deliveryBoys = await DeliveryBoy.find();
    res.json(deliveryBoys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDeliveryBoy = async (req, res) => {
    const deliveryBoy = new DeliveryBoy({
      name: req.body.name,
      capacity: req.body.capacity
    });
  
    try {
      const newDeliveryBoy = await deliveryBoy.save();
      res.status(201).json(newDeliveryBoy);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

exports.updateDeliveryBoy = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    if (deliveryBoy == null) {
      return res.status(404).json({ message: 'Delivery boy not found' });
    }
    // Update delivery boy capacity
    deliveryBoy.capacity = req.body.capacity;
    await deliveryBoy.save();
    res.json(deliveryBoy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a delivery boy
exports.deleteDeliveryBoy = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id);
    if (deliveryBoy == null) {
      return res.status(404).json({ message: 'Delivery boy not found' });
    }
    await deliveryBoy.remove();
    res.json({ message: 'Delivery boy deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders assigned to a delivery boy
exports.getAssignedOrders = async (req, res) => {
  try {
    const deliveryBoy = await DeliveryBoy.findById(req.params.id).populate('assignedOrders');
    if (deliveryBoy == null) {
      return res.status(404).json({ message: 'Delivery boy not found' });
    }
    res.json(deliveryBoy.assignedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
