const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  paymentId: String,
  razorpayorderid: String,
  userId: String,
  status: String,
  desc: Object,
  subtotal: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;