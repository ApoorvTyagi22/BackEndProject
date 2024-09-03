const mongoose = require("mongoose");
const product_schema = require("./product.model");
const { type } = require("express/lib/response");

const status_enum = ["active", "inactive", "deleted"];
const cart_schema = new mongoose.Schema(
  {
    items: {
      type: Number,
      required: true,
    },

    totalValue: {
      type: Number,
      required: true,
    },

    status: {
      type: status_enum,
      default: "active",
    },

    uniqueCartId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Cart", cart_schema);
