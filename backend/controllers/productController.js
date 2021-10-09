const Product = require("../models/productModel");

//*********** Create products  -- Admin Route **************
exports.createProduct = async (req, res, next) => {
  // Mongo Db Query for creating new Product
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// ************** get products Public Route **************
exports.getAllProducts = async (req, res) => {
  //Mongodb Query for fetching all products
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

//************** Update product -- Admin Route**************
exports.updateProducts = async (req, res, next) => {
  //Mongodb Query for finding if specific product exits or not
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  //Mongodb Query for updating the product found
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//************** Delete product -- Admin Route**************
exports.deleteProducts = async (req, res, next) => {
  //Mongodb Query for finding if specific product exits or not
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  //Mongodb Query for Deleting the product found
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
};
