const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModles");

// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "this is a simple id", url: "profilepic url" },
  });

  const token = user.getJwtToken();

  res.status(201).json({ success: true, token });
});

// user Login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // checking weather user have given both email and password

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password"); // we have taken both email and password diffrently as in schema we have not given option to give password default when asked

  if (!user) {
    return next(
      new ErrorHandler("Please Enter Correct UserName and Password", 401)
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Please Enter Correct UserName and Password", 401)
    );
  }

  const token = user.getJwtToken();
  res.status(201).json({ success: true, token });
});
