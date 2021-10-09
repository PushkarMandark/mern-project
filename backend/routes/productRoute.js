const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
} = require("../controllers/productController");

const router = express.Router();

// using router.route and passing end url and getProduct Controller
router.route("/products").get(getAllProducts); // Route for fetching all products
router.route("/product/new").post(createProduct); // route for creating new product
router.route("/product/:id").put(updateProducts).delete(deleteProducts); // route for Updating & Deleting product

module.exports = router;
