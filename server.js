const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

// Route files
const payments = require('./routes/payments');
const donations = require('./routes/donations');

const app = express();

// Server headers

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  console.log('running');
  next();
});

// Body parser
app.use(express.json());

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/payments', payments);
app.use('/api/v1/donations', donations);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} with port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
