const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

// Route to add a new product
router.post("/add", (req, res) => {
  // In case of blank req body
  if (!req.body) {
    return res.status(400).send("Request body is missing !");
  }

  // Product obj that needs to be transferred
  var prod_obj = {
    name: req.body.name.toLowerCase(),
    seller: req.body.seller,
    quantity: req.body.quantity,
    left_quantity: req.body.quantity,
    price: req.body.price,
    price_pc: parseInt(req.body.price) / parseInt(req.body.quantity),
    status: "pending"
  };

  // Model to save the object
  var model = new Product(prod_obj);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        // In case of errors and miising params
        return res.status(500).send(doc.message);
      }

      // Successful add
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err.message);
      // Catch other errors.
    });
});

// Route to fetch all products
router.get("/fetchall", (req, res) => {
  // Search all products with no conditions
  Product.find({ status: "pending" }, (err, products) => {
    // Send response in json form
    res.status(200).json(products);
  }).catch(err => {
    // Catch erros if occured
    res.status(500).json(err.message);
  });
});

router.get("/fetch/:name", (req, res) => {
  Product.find(
    { name: req.params.name.toLowerCase(), status: "pending" },
    (err, product) => {
      res.status(200).json(product);
    }
  ).catch(err => {
    res.status(500).json(err.message);
  });
});

function orderupdate(id) {
  Order.updateMany(
    { prod_id: id },
    { $set: { status: "cancelled" } },
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

router.post("/fetch", (req, res) => {
  Product.find({ _id: req.body.id }, (err, product) => {
    res.status(200).json(product);
  }).catch(err => {
    res.status(500).json(err.message);
  });
});

router.put("/delete", (req, res) => {
  Product.findOne({ _id: req.body.id }, (err, product) => {
    if (!product) {
      res.status(300).json("No matching product !");
    } else {
      product.status = "cancelled";
      product.save((err, updatedProd) => {
        if (err) {
          res.status(500).json(err.message);
        } else {
          orderupdate(req.body.id);
          res.status(201).json(updatedProd);
        }
      });
    }
  }).catch(err => {
    res.status(500).json(err.message);
  });
});

// SEARCH ALL PENDING LISTINGS
router.get("/fetch/:seller/pending", (req, res) => {
  Product.find(
    { seller: req.params.seller.toLowerCase(), status: "pending" },
    (err, product) => {
      res.status(200).json(product);
    }
  ).catch(err => {
    res.status(500).json(err.message);
  });
});

// SEARCH READY TO DIPATCHED LISTINGS
router.get("/fetch/:seller/ready", (req, res) => {
  Product.find(
    { seller: req.params.seller.toLowerCase(), status: "Ready to Dispatch" },
    (err, product) => {
      res.status(200).json(product);
    }
  ).catch(err => {
    res.status(500).json(err.message);
  });
});

// SEARCH PAST LISTINGS

router.get("/fetch/:seller/past", (req, res) => {
  Product.find(
    { seller: req.params.seller.toLowerCase(), status: "Dispatched" },
    (err, product) => {
      res.status(200).json(product);
    }
  ).catch(err => {
    res.status(500).json(err.message);
  });
});

function orderDispatchupdate(id) {
  Order.updateMany(
    { prod_id: id },
    { $set: { status: "Dispatched" } },
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

router.put("/dispatch", (req, res) => {
  orderDispatchupdate(req.body.id);
  // Search all products with no conditions
  Product.update(
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
}
function UpdateOrderwithstatus(id, quantity, price, prod_id) {
  Order.find({ _id: id, status: "pending" }, (err, order) => {
    order = order[0].toObject();
    orderDispatchupdate(prod_id);
    Order.update(
      {
        _id: id
      },
      {
        $set: {
          quantity: parseInt(order.quantity) + parseInt(quantity),
          price: parseInt(order.price) + parseInt(price),
          status: "Ready to Dispatch"
        }
      },
      (err, order) => {
        console.log(order);
      }
    ).catch(err => {
      console.log(err);
    });
  });
}

function UpdateOrder(id, quantity, price) {
  Order.find({ _id: id }, (err, order) => {
    //order = order[0].toObject();
    Order.update(
      {
        _id: id
      },
      {
        $set: {
          quantity: parseInt(order[0].toObject().quantity) + parseInt(quantity),
          price: parseInt(order[0].toObject().price) + parseInt(price)
        }
      },
      (err, order) => {
        console.log(order);
      }
    ).catch(err => {
      console.log(err);
    });
  });
}

router.put("/update", (req, res) => {
  Product.find({ _id: req.body.prodid }, (err, prod) => {
    prod = prod[0].toObject();
    if (prod.left_quantity == req.body.quantity) {
      UpdateOrderwithstatus(
        req.body.id,
        req.body.quantity,
        prod.price_pc * req.body.quantity,
        req.body.prodid
      );
      Product.update(
        { _id: req.body.prodid, status: "pending" },
        { $set: { left_quantity: 0, status: "Ready to Dispatch" } },
        (err, upd_prod) => {
          //res.status(200).send(upd_prod);
        }
      ).catch(err => {
        //res.status(500).send(err);
      });
    }
    if (prod.left_quantity > req.body.quantity) {
      prod.left_quantity = parseInt(prod.left_quantity);
      prod.left_quantity -= parseInt(req.body.quantity);
      UpdateOrder(
        req.body.id,
        req.body.quantity,
        prod.price_pc * req.body.quantity
      );
      Product.update(
        { _id: req.body.prodid, status: "pending" },
        { $set: { left_quantity: prod.left_quantity } },
        (err, upd_prod) => {
          //res.status(200).json(upd_prod);
        }
      ).catch(err => {
        //res.status(500).json(upd_prod);
      });
    } else {
      return res.status(500).send(prod);
    }
  });
});

router.post("/fetchquantity", (req, res) => {
  Product.find({ _id: req.body.id }, (err, prod) => {
    return res.status(200).send(prod);
  }).catch(err => {
    return res.status(500).send(err);
  });
});

module.exports = router;
