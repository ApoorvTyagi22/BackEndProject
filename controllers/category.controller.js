/**
 * 
 * Define the controller for creating categories
 * 
 * POST localhost:8888/ecomm/api/v1/categories
 * 
 * with req body: 
 *  {
        "name" : "Household", 
        "description" : "This will have all the household items"    

    }
 */

const category_model = require("../models/category.model.js");

exports.createNewCategory = async (req, res) => {
  // Read the Request body
  //Create the category object

  const cat_data = {
    name: req.body.name,
    description: req.body.name,
  };

  // Insert into mongodb

  try {
    const category = await category_model.create(cat_data);

    return res.status(201).send(category);
  } catch (err) {
    console.log("Error while adding the cateogry", err);

    return res.status(500).send({
      message: "Error while creating the category",
    });
  }
  //return the resonse of the created category
};

exports.findCategoryByName = async (req, res) => {
  //Check if the category name is present in the system

  try {
    const category = await category_model.findOne({
      name: req.body.name,
    });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
      });
    }

    const send_data = {
      name: category.name,
      description: category.description,
    };

    return res.status(200).send(send_data);
  } catch (err) {
    console.log("Error while finding the category", err);
  }

  //If present return the category
};

exports.findAllCategories = async (req, res) => {
  //Find all the categories in the system

  try {
    const categories = await category_model.find({});

    const send_data = categories.map((category) => {
      return {
        name: category.name,
        description: category.description,
      };
    });

    return res.status(200).send(send_data);
  } catch (err) {
    console.log("Error while finding the categories", err);
    return res.status(500).send({
      message: "Error while finding the categories",
    });
  }

  //Return the categories
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryToUpdate = await category_model.findOne({
      name: req.body.name,
    });

    if (!categoryToUpdate) {
      console.log("Category not found");
      return res.status(404).send({
        message: "Category not found",
      });
    }

    const updatedCategory = await category_model.findOneAndUpdate(
      {
        name: req.body.name,
      },
      {
        description: req.body.description,
      },
      { new: true }
    );

    const send_data = {
      name: updatedCategory.name,
      description: updatedCategory.description,
    };
    return res.status(200).send(send_data);
  } catch (err) {
    console.log("Error while updating the category", err);
    return res.status(500).send({
      message: "Error while updating the category",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  //Find the category if it exists
  const categoryToDelete = await category_model.findOne({
    name: req.body.name,
  });

  if (!categoryToDelete) {
    return res.status(404).send({
      message: "Category not found",
    });
  }

  //Delete the category
  try {
    const deletedCategory = await category_model.findOneAndDelete({
      name: req.body.name,
    });

    const data_return = {
      name: deletedCategory.name,
      description: deletedCategory.description,
    };
    return res.status(200).send({
      message: "Category deleted successfully",
      data_return,
    });
  } catch (err) {
    console.log("Error while deleting the cateogry", err);
    return res.status(500).send({
      message: "Error while deleting the category",
      err,
    });
  }

  //Return the response
};
