const io = require('socket.io');

const socket = () => {
  io.on('connection', socket => {
    console.log('a user connected');
  });
};

module.exports = socket;
