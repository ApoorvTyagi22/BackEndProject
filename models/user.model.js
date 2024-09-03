/**
 * This is the user model. Where we define the schema of the user.
 * schema is the structure of the document that we are going to store in the database.
 *
 */

const mongoose = require("mongoose");

/**
 * name
 * userId
 * password
 * email
 * userType
 */

// This is the schema of the user. It has the following fields:
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 10,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "ADMIN"], // This is the enum that we are going to use for the user type. It can only be CUSTOMER or ADMIN
    },
  },
  { timestamps: true, versionKey: false }
  // This is the option that we are passing to the schema. It will add the timestamps to the document. CreatedAt and UpdatedAt
);

//mongoose.model will create a collection in the database with the name "Users"(plural itself)
//and the schema userSchema

module.exports = mongoose.model("User", userSchema);
