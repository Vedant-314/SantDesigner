const mongoose = require("mongoose");

const GuestorderSchema = new mongoose.Schema({
  paymentId: String,
  razorpayorderid: String,
  userName: String,
  phoneNumber: String,
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

const GuestOrder = mongoose.model("GuestOrder", GuestorderSchema);

module.exports = GuestOrder;
