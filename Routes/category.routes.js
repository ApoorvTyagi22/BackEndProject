/**
 * Post localhost:8888/ecomm/api/v1/categories
 *
 */

const category_mw = require("../middlewares/category.mw.js");
const category_controller = require("../controllers/category.controller.js");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [category_mw.verifyToken, category_mw.isAdmin],
    category_controller.createNewCategory
  );

  /**
   * Route for finding the category by name
   * localhost:8888/ecomm/api/v1/categories
   */

  app.get(
    "/ecomm/api/v1/findcategory",
    [category_mw.verifyGetCateRequest, category_mw.verifyToken],
    category_controller.findCategoryByName
  );

  app.get(
    "/ecomm/api/v1/findallcategory",
    [category_mw.verifyToken],
    category_controller.findAllCategories
  );

  app.put(
    "/ecomm/api/v1/updatecategory",
    [
      category_mw.verifyUpdateRequest,
      category_mw.verifyToken,
      category_mw.isAdmin,
    ],
    category_controller.updateCategory
  );

  app.delete(
    "/ecomm/api/v1/deletecategory",
    [
      category_mw.verifyToken,
      category_mw.isAdmin,
      category_mw.verifyDeleteRequest,
    ],
    category_controller.deleteCategory
  );
};
