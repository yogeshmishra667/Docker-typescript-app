const express = require('express');
const userController = require('../Controllers/userController');

const Router = express.Router();

//authentication is user related but we add separate routes for auth.
//it not related to 100% to user but it follow restFul api rule
//we can't remove user routes we also use later
// Router.route('/signup').post(authController.signup);
// Router.route('/login').post(authController.login);
// Router.route('/logout').get(authController.logout);
// Router.route('/getUserData').get(authController.getUserData);
// Router.route('/forgotPassword').post(authController.forgotPassword);
// Router.route('/resetPassword/:token').patch(authController.resetPassword);
// Router.route('/updateMyPassword').patch(
//   authController.protect,
//   authController.updatePassword
// );
// Router.route('/updateMe').patch(
//   authController.protect,
//   userController.updateMe
// );
// Router.route('/deleteMe').delete(
//   authController.protect,
//   userController.deleteMe
// );

//users route
Router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
