const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentId: String,
  razorpayorderid: String,
  userId: String,
  userName: String,
  paymentStatus: String,
  prodStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  desc: Object,
  subtotal: Number,
  paymentMethod: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
