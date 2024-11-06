const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  SKU: String,
  price: Number,
  desc: String,
  category: String
});

const Shoe = mongoose.model('shoe', shoeSchema);
module.exports = Shoe;
