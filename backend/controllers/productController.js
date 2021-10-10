const mongoose = require("mongoose");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

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
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // this is to check weather passed id in url is valid ObjectID

    //Mongodb Query for finding if specific product exits or not
    const idPassed = new mongoose.Types.ObjectId(req.params.id);
    let product = await Product.findById(idPassed);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
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
  } else {
    return next(new ErrorHandler("Error Not Valid Object ID", 404));
  }
};

//************** Delete product -- Admin Route**************
exports.deleteProducts = async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    //Mongodb Query for finding if specific product exits or not
    const idPassed = new mongoose.Types.ObjectId(req.params.id);
    let product = await Product.findById(idPassed);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    //Mongodb Query for Deleting the product found
    await product.remove();
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } else {
    return next(new ErrorHandler("Error Not Valid Object ID", 404));
  }
};

//************** GET Single product Details -- Public Route**************
exports.singleProduct = async (req, res, next) => {
  //Mongodb Query for finding if specific product exits or not
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.

    const idPassed = new mongoose.Types.ObjectId(req.params.id);
    let product = await Product.findById(idPassed);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } else {
    return next(new ErrorHandler("Error Not Valid Object ID", 404));
  }
};
