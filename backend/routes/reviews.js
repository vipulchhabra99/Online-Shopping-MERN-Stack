const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Ratings = require("../models/Ratings");

router.get("/:user", (req, res) => {
  Review.find({ seller_id: req.params.user }, (error, rev) => {
    return res.status(200).json(rev);
  }).catch(err => {
    return res.status(500).json("Internal error");
  });
});

router.get("/:user/:prod_id", (req, res) => {
  Review.find(
    { seller_id: req.params.user, product_id: req.params.prod_id },
    (err, rev) => {
      res.status(200).json(rev);
    }
  ).catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
