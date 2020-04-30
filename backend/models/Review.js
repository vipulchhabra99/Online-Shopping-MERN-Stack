const mongoose = require("mongoose");

let Review = new mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  seller_id: {
    type: String,
    required: true
  },
  buyer_id: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("review", Review);
