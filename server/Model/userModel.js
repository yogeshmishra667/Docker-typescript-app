const mongoose = require('mongoose');
const validator = require('validator'); //validator is a package for validation

//mongoose schema and schema type
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    unique: true, //unique email
    lowercase: true,
    required: [true, 'please provide your email'],
    validate: [validator.isEmail, 'please provide your valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: true, //we can't use unique with select:false
    minlength: 8, //password length
    select: false, //this is not show password in response
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      //this only work on create and save.
      //we can't use arrow function because we need to access this..
      //it only works on save() to we also need to use save on update.
      validator: function (el) {
        return el === this.password;
      },
      message: 'password does not matched',
    },
  },
  passwordChangedAt: Date, //we need to know when password changed
  passwordResetToken: String, //we need to know when password reset token created
  passwordResetExpires: Date, //we need to know when password reset token expires
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false, //we don't want to show active in response
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
