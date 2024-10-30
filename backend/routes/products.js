const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productController");
const Item = require('../models/Item');

router.get(
  "/get-products",
  productControllers.controllers.getProducts
);

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); 
    res.status(200).json(items);  
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});



module.exports = router;
