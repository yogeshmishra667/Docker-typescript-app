const express = require('express');
const taskController = require('../Controllers/taskController');
const Router = express.Router();

//task route
Router.route('/')
  .get(taskController.getAllTask)
  .post(taskController.createTask);
Router.route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = Router;
