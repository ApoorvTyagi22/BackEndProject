/**
 * This is the product middlewater. It will verify the request body before sending it to the controller.
 */

const product_model = require("../models/product.model.js");

const verifyProductBody = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name is required",
    });
  }

  if (!req.body.description) {
    return res.status(400).send({
      message: "Description is required",
    });
  }

  if (!req.body.price) {
    return res.status(400).send({
      message: "Price is required",
    });
  }
  if (!req.body.category) {
    return res.status(400).send({
      message: "Category is required",
    });
  }

  if (!req.body.SKU) {
    return res.status(400).send({
      message: "SKU is required",
    });
  }

  const product = await product_model.findOne({
    SKU: req.body.SKU,
  });
  if (product) {
    return res.status(400).send({
      message: "Product with the same SKU already exists",
    });
  }

  next();
};

const verifyGetProdReq = (req, res, next) => {
  if (!req.body.SKU) {
    return res.status(400).send({
      message: "SKU is required",
    });
  }
  next();
};

const verifyPriceUpdate = (req, res, next) => {
  if (!req.body.SKU) {
    return res.status(400).send({
      message: "SKU is required to update the price",
    });
  }

  if (!req.body.price) {
    return res.status(400).send({
      message: "Price is required to update the product",
    });
  }
  next();
};

const verifyDeletereq = (req, res, next) => {
  if (!req.body.SKU) {
    return res.status(400).send({
      message: "SKU is required to delete the product",
    });
  }
  next();
};

module.exports = {
  verifyProductBody: verifyProductBody,
  verifyGetProdReq: verifyGetProdReq,
  verifyPriceUpdate: verifyPriceUpdate,
  verifyDeletereq: verifyDeletereq,
};
