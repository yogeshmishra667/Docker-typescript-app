import { NextFunction, Request, Response } from 'express';
const Task = require('../Model/taskModel');
const catchAsync = require('../utils/catchAsync');
// const AppErrorCo = require('../utils/appError');

//User Route
exports.getAllTask = catchAsync(async (req:Request, res:Response) => {
  const tasks = await Task.find();
  res.status(200).json({
    result: tasks.length,
    status: 'success',
    data: {
      tasks,
    },
  });
});

exports.createTask = catchAsync(async (req:Request, res:Response) => {
  const newTask = await Task.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tasks: newTask,
    },
  });
});



exports.updateTask = catchAsync(async(req:Request, res:Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body ,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async(req:Request, res:Response) => {
    const task = await Task.findByIdAndDelete(req.params.id);
  res.json({
    status: 'the book is deleted successfully',
    data: {
      task,
    },
  });
});
