const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentId: String,
  razorpayorderid: String,
  userId: String,
  userName: String,
  paymentStatus: String,
  prodStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  desc: Object,
  subtotal: Number,
  paymentMethod: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
