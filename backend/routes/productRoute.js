const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  singleProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

// using router.route and passing end url and getProduct Controller
router.route("/products").get(isAuthenticatedUser, getAllProducts); // Route for fetching all products
router.route("/product/new").post(createProduct); // route for creating new product
router
  .route("/product/:id")
  .put(updateProducts)
  .delete(deleteProducts)
  .get(singleProduct); // route for Updating & Deleting product

module.exports = router;
