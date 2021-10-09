const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "please Enter Product Price"],
    maxlength: [8, "Price Can not exceed more than 8 character"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter product Category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxlength: [4, "max stock length exceeded more than 4 character"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: [true, "please enter reviewname"],
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: [true, "please Enter the Review Comment"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
