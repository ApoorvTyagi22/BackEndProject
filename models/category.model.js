/**
 * Name,
 * descrepiton
 */

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
); // timestamps will give createdAt and modifiedAt, VersionKey the version field is not added

module.exports = mongoose.model("Category", categorySchema);
//Name of the collection will be Categories
