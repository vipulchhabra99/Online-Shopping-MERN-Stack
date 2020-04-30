const express = require("express");
const router = express.Router();
const Ratings = require("../models/Ratings");

router.get("/:user", (req, res) => {
  Ratings.find({ seller_id: req.params.user }, (error, rat) => {
    return res.status(200).json(rat);
  }).catch(err => {
    return res.status(500).json("Internal error");
  });
});

router.get("/:user/:prod_id", (req, res) => {
  Ratings.find(
    { seller_id: req.params.user, prod_id: req.params.prod_id },
    (err, rat) => {
      res.status(200).json(rat);
    }
  ).catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
