const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createTokenAndSend = (user, res, statusCode, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_SIG, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const cookieOptions = {
    maxAge: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 1000
    ),
    httpOnly: true,
    path:'/'
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("TAREFA_TOKEN", token, cookieOptions);
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    token,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please provide your credentials properly!", 400));
  }

  const user = await User.findOne({ email: req.body.email }).select("password");

  if (!user) {
    return next(new AppError(`No user with this credentials!`, 401));
  }

  if (!(await user.comparePassword(user.password, req.body.password))) {
    return next(new AppError("Email or password is incorrect!", 401));
  }

  createTokenAndSend(user, res, 200, "Login Successfull");
});
exports.signUp = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(new AppError("Registration Failed", 400));
  }
  const newUser = await User.create(req.body);
  createTokenAndSend(
    newUser,
    res,
    201,
    "Signup Successfull, You are logged in!"
  );
});

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not Logged in, Please Login to get access!", 401)
    );
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVATE_SIG
  );
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = user;
  next();
});

exports.allowedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to access this document!", 401)
      );
    }
    next();
  };
};
