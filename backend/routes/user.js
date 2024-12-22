const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require('../models/Order');
const GuestOrder = require('../models/GuestOrder');
const Razorpay = require('razorpay');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require("nodemailer");
const otpMap = new Map();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
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
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Register successful", success: true, data: token });
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
router.post("/create-guest-order", async (req, res) => {
  const { subtotal } = req.body;

  const amount = subtotal * 100;

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "receipt#sb01",
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/verify-guest-payment', async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, cart, firstName , phoneNumber ,address, subtotal } = req.body;
  const secret = process.env.KEY_SECRET;

  const generatedSignature = crypto.createHmac('sha256', secret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');

  if (generatedSignature === razorpaySignature) {
    try {
      const newOrder = new GuestOrder({
        paymentId: razorpayPaymentId,
        razorpayorderid: razorpayOrderId,
        firstName:firstName,
        phoneNumber : phoneNumber,
        paymentStatus: 'Success',
        paymentMethod: "online",
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
router.post('/verify-payment', async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, cart, userId, userName , address, subtotal } = req.body;
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
        userName:userName,
        paymentStatus: 'Success',
        paymentMethod: "online",
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

router.post("/create-cod-order", async (req, res) => {
  try {
    const { cart, userId, userName, address, subtotal } = req.body;

    const newOrder = new Order({
      userId,
      userName,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      desc: {
        items: cart,
        address: address
      },
      subtotal: subtotal + 120, 
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "COD order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating COD order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create COD order",
    });
  }
});
router.post("/create-guest-cod-order", async (req, res) => {
  try {
    const {
      cart,
      firstName,
      phoneNumber,
      address,
      subtotal,
    } = req.body;

    const newOrder = new GuestOrder({
      firstName: firstName,
      phoneNumber: phoneNumber,
      paymentStatus: "Success",
      paymentMethod: "COD",
      desc: {
        items: cart,
        address: address,
      },
      subtotal:subtotal+120,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "COD order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating COD order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create COD order",
    });
  }
});



router.get('/orders/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      // console.log(userId);
      const orders = await Order.find({ userId :userId});

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

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999); // 6-digit OTP

  otpMap.set(email, { otp, expires: Date.now() + 60 * 1000 }); // Store OTP with 1 min expiration

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.put("/admin/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

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

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const otpData = otpMap.get(email);

  if (otpData && otpData.otp === parseInt(otp) && Date.now() < otpData.expires) {
    otpMap.delete(email); 
    res.json({ success: true, message: "OTP verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});

router.get("/guest-orders/:phoneNumber", async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const orders = await GuestOrder.find({ phoneNumber });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this phone number" });
    }
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
