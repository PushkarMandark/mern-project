const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// work we can do before/pre saving user data like encypt pass using bcrypt
// insted of using () => {} as 2nd arrgument we used asyn function  as we use this and cannot use this in arrow function
userSchema.pre("save", async function (next) {
  // we use if condition to check if user is updating his info not passowrd it shoud not encypt double his paassword only change when user udates his passowrd or make new profile
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token we save data in jwt token to store it in cookie so it rember user when he register not need to login again.
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
