/**
 * This is the product controller. It will handle all the requests related to the product.
 */

const product_model = require("../models/product.model.js");

exports.createNewProduct = async (req, res) => {
  //Read the request body
  const product_data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    SKU: req.body.SKU,
  };

  try {
    const product = await product_model.create(product_data);

    if (!product) {
      return res.status(500).send({
        message: "Error while creating the product",
      });
    }

    const send_data = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      SKU: product.SKU,
    };

    res.status(201).send(send_data);
  } catch (err) {
    console.log("Error while creating the product", err);
    res.status(500).send({
      message: "Error while creating the product",
    });
  }

  //Create the product object
  //Insert into mongodb
  //Return the response of the created product
};

exports.getProduct = async (req, res) => {
  try {
    console.log("Request body", req.body);
    const product = await product_model.find({
      SKU: req.body.SKU,
    });
    console.log("After getting the product", product);
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
      });
    }

    const send_data = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      SKU: product.SKU,
    };
    return res.status(200).send(send_data);
  } catch (err) {
    console.log("Error while getting the product", err);
    return res.status(500).send({
      message: "Error while getting the product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  //Read the request body
  const product = await product_model.find({
    SKU: req.body.SKU,
  });

  if (!product) {
    return res.status(404).send({
      message: "Product  not found",
    });
  }

  try {
    const updated_product = await product_model.findOneAndUpdate(
      {
        SKU: req.body.SKU,
      },
      {
        name: req.body.name,
        price: req.body.price,
      },
      { new: true }
    );

    const updated_product_data = {
      name: updated_product.name,
      description: updated_product.description,
      price: updated_product.price,
      category: updated_product.category,
      SKU: updated_product.SKU,
    };
    return res.status(200).send(updated_product_data);
  } catch (err) {
    console.log("Error while updating the product", err);
    return res.status(500).send({
      message: "Error while updating the product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product_deleted = await product_model.findOneAndDelete({
      SKU: req.body.SKU,
    });

    if (!product_deleted) {
      return res.status(404).send({
        message: "Product not found",
      });
    }

    return res.status(200).send(product_deleted);
  } catch (err) {
    console.log("Error while deleting the proudct", err);
    res.status(500).send({
      messsage: "Error while deleting the product",
    });
  }
};
