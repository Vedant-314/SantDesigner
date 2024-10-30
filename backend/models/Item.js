const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  SKU: String,
  price: Number,
  desc: String,
  category: String
});

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
