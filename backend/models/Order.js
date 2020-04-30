const mongoose = require("mongoose");

// Order schema for mongoose

let Order = new mongoose.Schema({
  prod_id: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  reviews: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  },
  buyer_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("order", Order);
