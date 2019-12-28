const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const socketio = require('socket.io');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

// Connect Sockets
// socket();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.get('/', (req, res) => {
  res.send(`Hello world`);
});

// Body parser
app.use(express.json());

// Socket Event
io.on('connection', () => {
  console.log('New WebSocket connection');
});

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

server.listen(
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
