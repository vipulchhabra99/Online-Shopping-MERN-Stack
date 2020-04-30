const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const Ratings = require("../models/Ratings");
const Review = require("../models/Review");

function orderReadyupdate(id) {
  Order.updateMany(
    { prod_id: id },
    { $set: { status: "Ready To Dispatch" } },
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
} // Route to add a new order
router.post("/place", (req, res) => {
  // In case of blank req body
  if (!req.body) {
    return res.status(400).send("Request body is missing !");
  }

  // Product obj that needs to be transferred
  var order_obj = {
    prod_id: req.body.prod_id,
    quantity: req.body.quantity,
    buyer_name: req.body.buyer_name,
    status: "pending",
    ratings: 0,
    reviews: "Not reviewed",
    name: "",
    seller: "",
    price: ""
  };

  Product.findOne({ _id: req.body.prod_id }, (err, prod) => {
    order_obj.name = prod.name;
    order_obj.seller = prod.seller;
    console.log(order_obj);
    if (prod.left_quantity == req.body.quantity) {
      prod.status = "Ready to Dispatch";
      order_obj.status = "Ready to Dispatch";
      orderReadyupdate(order_obj.prod_id);
    }

    if (prod.left_quantity >= req.body.quantity) {
      order_obj.price = (prod.price / prod.quantity) * req.body.quantity;
      prod.left_quantity = prod.left_quantity - req.body.quantity;
      prod.save((err, updatedqunatity) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal server error!");
        } else {
          var model = new Order(order_obj);
          model
            .save()
            .then(doc => {
              if (!doc || doc.length === 0) {
                // In case of errors and missing params
                return res.status(500).send(doc.message);
              }

              // Successful add
              res.status(201).send(doc);
            })
            .catch(err => {
              res.status(500).json(err.message);
              // Catch other errors.
            });
        }
      });
    }

    if (prod.left_quantity < req.body.quantity) {
      return;
    }
  });
});

// Route to fetch all products
router.get("/fetchall", (req, res) => {
  // Search all products with no conditions
  Order.find({}, (err, products) => {
    // Send response in json form
    res.status(200).json(products);
  }).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

router.get("/fetch/:user", (req, res) => {
  Order.find({ buyer_name: req.params.user }, (err, orders) => {
    // Send response in json form
    res.status(200).json(orders);
  }).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

router.put("/updateod", (req, res) => {
  // Search all products with no conditions
  Order.update(
    { _id: req.body.id, status: "Ready to Dispatch" },
    { $set: { status: "Dispatched" } },
    (err, products) => {
      // Send response in json form
      res.status(200).json(products);
    }
  ).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

function UpdateRatings(buyer, seller, rating, prod_id) {
  var ratings = {
    buyer_id: buyer,
    seller_id: seller,
    ratings: rating,
    prod_id: prod_id
  };

  var rating = new Ratings(ratings);

  rating.save();
}

router.put("/rate", (req, res) => {
  UpdateRatings(
    req.body.buyer_id,
    req.body.seller_id,
    req.body.ratings,
    req.body.prod_id
  );
  // Search all products with no conditions
  Order.update(
    { _id: req.body.id },
    { $set: { ratings: parseInt(req.body.ratings) } },
    (err, order) => {
      // Send response in json form
      res.status(200).json(order);
    }
  ).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

function UpdateReview(buyer, seller, review, prod_id) {
  var review = {
    buyer_id: buyer,
    seller_id: seller,
    review: review,
    product_id: prod_id
  };

  var review = new Review(review);

  review.save();
}

router.put("/review", (req, res) => {
  UpdateReview(
    req.body.buyer_id,
    req.body.seller_id,
    req.body.review,
    req.body.prod_id
  );
  // Search all products with no conditions
  Order.update(
    { _id: req.body.id, status: "Dispatched" },
    { $set: { reviews: req.body.review } },
    (err, order) => {
      // Send response in json form
      res.status(200).json(order);
    }
  ).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

router.put("/updateod", (req, res) => {
  Order.update(
    { _id: req.body.id, status: "Ready to Dispatch" },
    { $set: { status: "Dispatched" } },
    (err, products) => {
      // Send response in json form
      res.status(200).json(products);
    }
  ).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

router.put("/updateorder", (req, res) => {
  Order.update(
    {
      _id: req.body.id,
      status: "pending"
    },
    { $set: { quantity: req.body.quantity, price: req.body.price } },
    (err, order) => {
      res.status(200).json(order);
    }
  ).catch(err => {
    res.status(500).json(err.message);
  });
});

module.exports = router;
