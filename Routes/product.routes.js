/**
 * This file contains the routes for the product module
 */

const product_controller = require("../controllers/product.controller.js");
const product_mw = require("../middlewares/product.mw.js");
const category_mw = require("../middlewares/category.mw.js");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/products",
    [product_mw.verifyProductBody, category_mw.verifyToken],
    product_controller.createNewProduct
  );

  app.get(
    "/ecomm/api/v1/findproduct",
    [product_mw.verifyGetProdReq, category_mw.verifyToken],
    product_controller.getProduct
  );

  app.put(
    "/ecomm/api/v1/updateproduct",
    [product_mw.verifyPriceUpdate, category_mw.verifyToken],
    product_controller.updateProduct
  );

  app.delete(
    "/ecomm/api/v1/deleteproduct",
    [product_mw.verifyDeletereq],
    product_controller.deleteProduct
  );
};
