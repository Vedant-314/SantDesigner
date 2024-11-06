const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productController");
const Item = require('../models/Item');
const Shoe = require('../models/Shoe');

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

router.get('/shoes', async (req, res) => {
  try {
    const shoes = await Shoe.find(); 
    res.status(200).json(shoes);  
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});



module.exports = router;
