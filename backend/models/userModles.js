const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter Your name"],
    maxlength: [30, "Cannot exceed more than 30 characters"],
    minlength: [4, "Name should be more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your email id"],
    unique: [true, "Email id already registerd"],
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "passowrd must be min 8 characters"],
    select: false,
  },
});
