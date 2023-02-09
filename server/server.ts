require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const appData = require('./app');

process.on('uncaughtException', (err:any) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.MONGO_URI;
console.log(DB);
mongoose.connect(DB).then(() => {
  console.log('DB connected successfully 🔥🎉');
});

//define port
const port = process.env.PORT;
//for start the server of express
const server = appData.listen(port, () => {
  console.log(`the server start on port ${port}🤡`);
});

process.on('unhandledRejection', (err:any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
