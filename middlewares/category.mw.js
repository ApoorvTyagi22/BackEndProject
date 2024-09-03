const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");
const user_model = require("../models/user.model");

const verifyToken = (req, res, next) => {
  //Check if the token is present

  const token = req.headers["x-access-token"];
  //if in the headers there is a key called x-access-token then we will get the value of that key

  //If the token is not present then we will send the response as 403
  if (!token) {
    return res.status(403).send({
      message: "No token found : UnAuthorized",
    });
  }

  //IF its the valid token

  if (token) {
    // if it can docode the token then it will return the decoded value otherwise it will return the error
    //in the call back function
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "UnAuthorized",
        });
      }
      const user = await user_model.findOne({ userID: decoded.id });

      if (!user) {
        return res.status(400).send({
          message: "Unauthorized, the user for this token doesnt exist.",
        });
      }
      //ser the user info in the body
      req.user = user;
      next();
    });
  }

  // Then move to the next step
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  console.log(user.userType);
  if (user && user.userType == "ADMIN") {
    next();
  } else {
    return res.status(403).send({
      message: "Only admin users are allowed access to this ",
    });
  }
};

const verifyGetCateRequest = (req, res, next) => {
  if (req.body.name == null) {
    res.status(400).send({
      message: "Category name not present in the request body",
    });
  }

  next();
};

const verifyUpdateRequest = (req, res, next) => {
  if (req.body.name == null) {
    res.status(400).send({
      message: "Category name not present in the request body",
    });
  }

  if (req.body.description == null) {
    res.status(400).send({
      message: "Category description not present in the request body",
    });
  }
  next();
};

const verifyDeleteRequest = (req, res, next) => {
  if (req.body.name == null) {
    res.status(400).send({
      message: "Category name not present in the request body",
    });
  }
  next();
};
module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  verifyGetCateRequest: verifyGetCateRequest,
  verifyUpdateRequest: verifyUpdateRequest,
  verifyDeleteRequest: verifyDeleteRequest,
};
