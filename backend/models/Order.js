const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentId: String,
  razorpayorderid: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  status: String,
  desc: Object,
  subtotal: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
