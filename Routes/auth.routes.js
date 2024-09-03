/**
 * Create a post CAL for this URI
 * /ecomm/api/v1/auth/signup
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller");
const {
  verifySignUpBody,
  verifySignInBody,
  verifyToken,
} = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/auth/signup",
    [verifySignUpBody],
    authController.signup
  );
  /**
   * route for POST
   * localhost:8888/ecomm/api/v1/auth/signin
   */

  app.post(
    "/ecomm/api/v1/auth/signin",
    [verifySignInBody],
    authController.signin
  );
};
