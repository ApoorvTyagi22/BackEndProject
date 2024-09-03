/**
 * Starting file of the project.
 */

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");

const app = express();

app.use(express.json()); // for testing through postman changes json to js (the json request body must be read as js)

/**
 * Create an admin user at the starting of the application,
 * if not already present.
 */

//Connection with mongodb

mongoose.connect(db_config.DB_URL);

const database = mongoose.connection;

database.on("error", () => {
  console.log("Error in connection");
});

database.once("open", () => {
  console.log("Connected to Mongodb");
  init();
});

async function init() {
  try {
    // Check if admin is already present. wait for the result before moving forward.
    let user = await user_model.findOne({ userID: "admin" });

    if (user) {
      console.log("Admin is already present");
      return;
    }
  } catch (err) {
    console.log("Error while reading, ", err);
  }

  try {
    // Create an admin user if not present.
    user = await user_model.create({
      name: "John",
      userID: "admin",
      email: "1233@hotmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome1", 8), // hash the password before storing it in the database
      //8 is the salt, its the amount of text that is added to the password before hashing it.(salt based hashing)
    });

    console.log("Admin created ", user);
  } catch (err) {
    if (err.code === 11000) {
      let usertwo = await user_model.findOne({
        userID: "admin",
      });

      console.log("Error: Duplicate userID. Admin already exists.");
      return usertwo;
    }
    console.log("Error while crearting the admin ");
  }
}

/**
 * Stich the route to the server
 * This means that the server will listen to the requests on this route.
 *
 *
 */

require("./Routes/auth.routes.js")(app);
require("./Routes/category.routes.js")(app);
require("./Routes/product.routes.js")(app);
require("./Routes/cart.routes.js")(app);

//Wherever a client sends a request it goes through the server(app) and the
//server should know where to send the request. So we need to stich the route to the server.

/**
 * this starts the server at the port number in config file.
 */

app.listen(server_config.PORT, () => {
  console.log("Server Started at port number :", server_config.PORT);
});
