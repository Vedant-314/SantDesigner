const mongoose = require('mongoose');

const stitchedSchema = new mongoose.Schema({
  SKU: String,
  price: Number,
  colour: String,
  Category: String
});

const Stitched = mongoose.model('stitch', stitchedSchema);
module.exports = Stitched;
