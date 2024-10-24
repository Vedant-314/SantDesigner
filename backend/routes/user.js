const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require('../models/Order');
const Razorpay = require('razorpay');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const authMiddleware = require("../middlewares/authMiddleware");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exist!", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect!", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({ success: true, data: user });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post('/add-to-cart', async (req, res) => {
  try {
      const { userId, item  } = req.body;
      
      const user = await User.findByIdAndUpdate(
          userId,
          { $push: { cart: item } }, 
          { new: true }
      );
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user.cart); 
  } catch (error) {
      res.status(500).json({ error: 'Error adding item to cart' });
  }
});

router.post('/update-cart', async (req, res) => {
  const { userId, cart } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      user.cart = cart;
      await user.save();

      res.json(user.cart); 
  } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

router.post('/create-order', async (req, res) => {
  const { subtotal } = req.body;

  const amount = subtotal * 100; 

  const options = {
    amount: amount, 
    currency: 'INR',
    receipt: 'receipt#sb01',
    payment_capture: 1
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/verify-payment', async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, cart, userId, address, subtotal } = req.body;

  const secret = process.env.KEY_SECRET;

  const generatedSignature = crypto.createHmac('sha256', secret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');

  if (generatedSignature === razorpaySignature) {
    try {
      const newOrder = new Order({
        paymentId: razorpayPaymentId,
        razorpayorderid: razorpayOrderId,
        userId: userId,
        status: 'Success',
        desc: {
          items: cart,
          address: address
        },
        subtotal
      });

      await newOrder.save();
      res.status(200).json({ message: 'Payment verified and order created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  } else {
    res.status(400).json({ error: 'Invalid payment signature' });
  }
});

router.get('/orders/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      
      const orders = await Order.find({ userId: userId });

      if (orders.length > 0) {
          res.status(200).json(orders);
      } else {
          res.status(404).json({ message: 'No orders found for this user.' });
      }
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Server error.' });
  }
});


module.exports = router;
