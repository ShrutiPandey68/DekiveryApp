const cron = require('node-cron');
const assignOrdersToDeliveryBoys = require('./assignOrders');

function start() {
  cron.schedule('0 * * * *', async () => {
    console.log('Running cron job to assign orders to delivery boys...');
    try {
      await assignOrdersToDeliveryBoys();
      console.log('Orders assigned successfully.');
    } catch (error) {
      console.error('Error assigning orders:', error);
    }
  });
}

module.exports = { start };
