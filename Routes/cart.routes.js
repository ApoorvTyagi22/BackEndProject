const cartController = require("../controllers/cart.controller");
const cart_mw = require("../middlewares/cart.mw");
module.exports = (app) => {
  app.post("/ecomm/api/v1/cart", cart_mw.verifyCart, cartController.createCart);

  app.get(
    "/ecomm/api/v1/readcart",
    [cart_mw.verifyCartRead],
    cartController.getCart
  );

  app.put(
    "/ecomm/api/v1/updatecart",
    [cart_mw.verifyCartUpdate],
    cartController.updateCart
  );

  app.delete(
    "/ecomm/api/v1/deletecart",
    [cart_mw.verifyCartDelete],
    cartController.deleteCart
  );
};
