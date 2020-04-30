const express = require("express");
const router = express.Router();
const user = require("../models/User");
const isEmpty = require("is-empty");
const Validator = require("validator");
const cors = require("cors");

router.post("/", (req, res) => {
  // Checking if login body is missing
  if (!req.body) {
    return res.status(400).send("Request body is missing !");
  }

  let errors = {};
  //  Check if Either email or password is empty
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  // Final check for message
  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email is invalid !";
  }

  // Validating the email
  if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid !";
  }

  // Checing if the password is empty
  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password is invalid !";
  }

  if (Object.keys(errors).length != 0) {
    return res.status(400).json(errors);
  }

  user.findOne({ email: req.body.email }, (err, user) => {
    if (user == null) {
      // If user sent to API has no email .
      return res.status(400).send({
        message: "User not found"
      });
    } else {
      // Validation of password entered by the user.
      if (user.validPassword(req.body.password)) {
        var user_object = {
          user_id: user._id,
          user_type: user.cust_type,
          user_name: user.name,
          user_status: "authenticated"
        };
        return res.status(201).send(user_object);
      } else {
        // vIf wrong password is entered by the user.
        return res.status(400).send({
          message: "Wrong password entered!"
        });
      }
    }
  });
});

module.exports = router;
