/**
 * This is the model for the product.
 * Each product will have the following fields:
 * 1. Name
 * 2. Description
 * 3. Price
 * 4. Category
 * 5. SKU (Stock Keeping Unit) - Unique Identifier for the product
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
