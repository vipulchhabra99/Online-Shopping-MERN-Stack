const mongoose = require("mongoose");

let Ratings = new mongoose.Schema({
  ratings: {
    type: Number,
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
  prod_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("ratings", Ratings);
