const cart_model = require("../models/cart.models");

exports.createCart = async (req, res) => {
  try {
    const newCartData = {
      items: req.body.items,
      totalValue: req.body.totalValue,
      status: req.body.status,
      uniqueCartId: req.body.uniqueCartId,
    };

    const newCart = await cart_model.create(newCartData);

    if (!newCart) {
      return res.status(400).send({
        message: "Failed to create a new cart",
      });
    }

    return res.status(201).send(newCart);
  } catch (err) {
    console.log("Error while creating the cart", err);

    return res.status(500).send({
      message: "Error while creating the cart",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartToFind = await cart_model.findOne({
      uniqueCartId: req.body.uniqueCartId,
    });

    if (!cartToFind) {
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    return res.status(200).send(cartToFind);
  } catch (err) {
    console.log("Error while getting the cart", err);

    return res.status(500).send({
      message: "Error while getting the cart",
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cartToUpdate = await cart_model.findOneAndUpdate(
      {
        uniqueCartId: req.body.uniqueCartId,
      },
      {
        items: req.body.items,
        totalValue: req.body.totalValue,
        status: req.body.status,
        uniqueCartId: req.body.uniqueCartId,
      },
      {
        new: true,
      }
    );

    if (!cartToUpdate) {
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    return res.status(200).send(cartToUpdate);
  } catch (err) {
    console.log("Error while updating the cart", err);

    return res.status(500).send({
      message: "Error while updating the cart",
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartToDelete = await cart_model.findOneAndDelete({
      uniqueCartId: req.body.uniqueCartId,
    });

    if (!cartToDelete) {
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    return res.status(200).send({
      message: "Cart deleted successfully",
    });
  } catch (err) {
    console.log("Error while deleting the cart", err);
    return res.status(500).send({
      message: "Error while deleting the cart",
    });
  }
};
