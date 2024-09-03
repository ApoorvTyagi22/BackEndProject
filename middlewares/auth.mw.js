/**
 * Create a middleware which checks,
 * if the request body is valid for the signup.
 */
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");

const verifySignUpBody = async (req, res, next) => {
  try {
    //check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed ! Name was not provied in the request body",
      });
    }

    //check for the mail
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed ! email was not provied in the request body",
      });
    }

    // chekc for the userID
    if (!req.body.userID) {
      return res.status(400).send({
        message: "Failed ! userID was not provied in the request body",
      });
    }
    // check if the user with the same user id is already present
    const user = await user_model.findOne({ userID: req.body.userID });
    if (user) {
      return res.status(400).send({
        message: "Failed ! user with the same ID in the request body",
      });
    }
    next();
  } catch (err) {
    console.log("Error while valadating the request ", err);
    res.status(500).send({
      // 500 is the status code for internal server error
      message: "Error while validating the request body",
    });
  }
};

const verifySignInBody = async (req, res, next) => {
  if (!req.body.userID) {
    return res.status(400).send({
      message: "UserID not present",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "password not present",
    });
  }

  next();
};

//We need to make sure that admins with token are only able to create categories.
//Otherwise, anyone can create categories.

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
};
