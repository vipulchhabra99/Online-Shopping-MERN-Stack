const mongoose = require("mongoose");

let Product = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  left_quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  price_pc: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("product", Product);
