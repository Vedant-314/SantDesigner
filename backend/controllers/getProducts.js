const Product = require('../models/Product'); 

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = getProducts;
