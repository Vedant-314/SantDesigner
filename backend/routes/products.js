const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productController");

router.get(
  "/get-products",
  productControllers.controllers.getProducts
);

module.exports = router;
