/**
 * Need to add the controller to register
 * a new user
 */
const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");

exports.signup = async (req, res) => {
  /**
   * logic to create the user
   */
  // read the request body
  const request_body = req.body;

  // Insert the data in the user collection in MongoDB
  const userObj = {
    name: request_body.name,
    userID: request_body.userID,
    email: request_body.email,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8),
  };

  try {
    const user_created = await user_model.create(userObj);
    /**
     * Return this user so that we dont return the password or other sensitive information
     */

    const res_obj = {
      name: user_created.name,
      userID: user_created.userID,
      email: user_created.email,
      userType: user_created.userType,
      createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };

    res.status(201).send(res_obj); //201 is the status code for susccessful creation of the resource
  } catch (err) {
    console.log("error while regestiring the user, ", err);
    res.status(500).send({
      message: err.message || "Some error occured while creating the user",
    });
  }
  // Return the response back to the user.
};

exports.signin = async (req, res) => {
  //Check if the user ID is present in the system

  const user = await user_model.findOne({ userID: req.body.userID });

  if (user == null) {
    return res.status(400).send({
      //400 is the status code for bad request
      message: "User ID passed is not a valid ID",
    });
  }

  //Password is correct

  // encrypt the request password and compare it with the password in the database
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send({
      message: "The password entered is incorrect, ",
    });
  }

  //using jwt we will create the access token with a given TTL(how long will the access last for) and return
  const token = jwt.sign({ id: user.userID }, secret.secret, {
    expiresIn: 120,
  });

  res.status(200).send({
    name: user.name,
    userID: user.userID,
    email: user.email,
    userType: user.userType,
    accessToken: token,
  });
};
