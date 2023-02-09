const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const globalErrorHandler = require('./Controllers/errorController');
const userRouter = require('./Routes/userRoutes');
const AppError = require('./utils/appError');

const app = express();

// 1) middleware
// 1.1) custom middleware/ GLOBAL MIDDLEWARE

//set security HTTP headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit request from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

//body-parser, reading data from the body into req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' })); //set body limit 10kb

//express does not support body on the req so we use middleware
//serving static file
app.use(express.static(`${__dirname}/public`));

//data sanitization against NoSQL query injection
app.use(mongoSanitize()); //remove $ and . from req.body and req

app.use(xss()); //clean user input from malicious HTML code and prevent XSS attack (cross site scripting) attack by removing all html tags from user input and replace it with html entities like < to < and > to > and so on and so forth.
//prevent parameter pollution

//prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'name',
      'email',
      'password',
      'passwordConfirm',
      'role',
      'passwordChangedAt',
      'passwordResetToken',
      'passwordResetExpires',
      'active',
    ],
    //whitelist is an array of fields that we want to allow to be duplicated in the query string
  })
);

//for handle CORS origin error
app.use(cors()); // Use this after the variable declaration

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

//2) ROUTES
//always use mounting after the declare the variable ⬇️

app.use('/api/v1/users', userRouter);

//for routes not define
app.all('*', (req, res, next) =>
  next(new AppError(`can't find ${req.originalUrl} on server`, 404))
);

//GLOBAL ERROR HANDLER
app.use(globalErrorHandler);
module.exports = app;
