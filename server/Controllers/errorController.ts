import { Request, Response, NextFunction } from 'express';
const AppError = require('../utils/appError');

const handleCastErrorDB = (err:any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  console.log(err);
  return new AppError(message, 400);
};

//for handle duplicate value on DB
const handleDuplicateFieldsDB = (err:any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

//for handle required value which is not provide
const handleValidationErrorDB = (err:any) => {
  const errors = Object.values(err.errors).map((el:any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// for the JWT error
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

//for when jwt token expired
const handleJWTExpiredError = () =>
  new AppError('Your Token is Expired. Please log in again!', 401);

const sendErrorDev = (err:any, res:Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err:any, res:Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err:any, req:Request, res:Response, next:NextFunction) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    //let error = { ...err };
    //console.log(err);
    //console.log(error);
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    sendErrorProd(err, res);
  }
};
