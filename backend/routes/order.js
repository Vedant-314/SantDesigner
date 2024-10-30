// orderRoutes.js
const express = require("express");
const Order = require("../models/Order"); // Adjust path to your Order model
const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    
    const orders = await Order.find()

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

module.exports = router;
