// orderRoutes.js
const express = require("express");
const Order = require("../models/Order"); 
const GuestOrder = require("../models/GuestOrder"); 

const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    
    const simpleOrders = await Order.find();
    const guestOrders = await GuestOrder.find();
    const allOrders = [...simpleOrders, ...guestOrders];
    res.status(200).json(allOrders);

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

router.put("/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log(status);

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.prodStatus = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
