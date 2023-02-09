const User = require('../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//User Route
exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();

  res.status(200).json({
    result: user.length,
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = (req, res) => {
  res.json({
    status: 'Error',
    data: {
      message: 'this route can not define',
    },
  });
};

exports.getUser = (req, res) => {
  res.json({
    status: 'Error',
    data: {
      message: 'this route can not define',
    },
  });
};

exports.updateUser = (req, res) => {
  res.json({
    status: 'Error',
    data: {
      message: 'this route can not define',
    },
  });
};

exports.deleteUser = (req, res) => {
  res.json({
    status: 'Error',
    data: {
      message: 'this route can not define',
    },
  });
};
