const express = require("express");
const router = express.Router();
const user_model = require("../models/User");
const Validator = require("validator");
const isEmpty = require("is-empty");

// Create a new user
router.post("/", (req, res) => {
  // CHecking if register body is missing
  if (!req.body) {
    return res.status(400).send("Request body is missing !");
  }

  let errors = {};
  // Validating the name , email, passwords fentered by the user.
  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";
  req.body.password2 = !isEmpty(req.body.password2) ? req.body.password2 : "";

  // Creater appropriate error messages by Validating it.
  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password is invalid";
  }

  if (!Validator.isLength(req.body.password, { min: 6, max: 30 })) {
    errors.password = "Password of invalid Lenght";
  }

  if (!Validator.equals(req.body.password, req.body.password2)) {
    errors.password = "Password doesn't match";
  }

  // If there are errors then return them here
  if (Object.keys(errors).length != 0) {
    return res.status(400).json(errors);
  }

  // Check if user already exists in the db
  if (
    user_model.findOne(
      {
        $or: [
          { email: req.body.email },
          { phone_number: req.body.phone_number }
        ]
      },
      (err, customer) => {
        if (Boolean(customer)) {
          res.status(400).send("Person already registered !");
        } else {
          // Setting up user object
          var user_object = {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            cust_type: req.body.cust_type,
            avg_rating: 0
          };

          //Savinf and hashing the password in db
          var model = new user_model(user_object);
          model.setPassword(req.body.password);
          model
            .save()
            .then(doc => {
              if (!doc || doc.length === 0) {
                return res.status(500).send(doc.message);
              }
              res.status(201).send(doc);
            })
            .catch(err => {
              res.status(500).json(err.message);
            });
        }
      }
    )
  );
});

module.exports = router;
