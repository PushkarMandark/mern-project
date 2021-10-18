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
