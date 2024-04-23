const DeliveryBoy = require('./models/deliveryBoyModel');
const Order = require('./models/orderModel');

async function assignOrdersToDeliveryBoys() {
  // Step 1: Retrieve available delivery boys
  const deliveryBoys = await DeliveryBoy.find();

  // Step 2: Sort orders (e.g., based on delivery duration or delivered quantity)
  const orders = await Order.find({ status: 'pending' }).sort({ deliveryDuration: 1 });

  // Step 3: Assign orders to delivery boys
  let currentDeliveryBoyIndex = 0;
  for (const order of orders) {
    const deliveryBoy = deliveryBoys[currentDeliveryBoyIndex];
    if (deliveryBoy.currentOrders.length < deliveryBoy.capacity) {
      // Assign the order to the delivery boy
      order.status = 'assigned';
      order.assignedTo = deliveryBoy._id;
      deliveryBoy.currentOrders.push(order._id);
      await order.save();
      await deliveryBoy.save();
      currentDeliveryBoyIndex = (currentDeliveryBoyIndex + 1) % deliveryBoys.length;
    }
  }
}

module.exports = assignOrdersToDeliveryBoys;
