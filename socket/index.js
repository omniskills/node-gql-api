import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import config from '../core/config/config.dev';
import Message from '../models/message';
import User from '../models/user';

const sockets = {};

const initSocketIO = (server) => {
  const io = new SocketIO(server);

  io.on('connection', (socket) => {
    const { token } = socket.handshake.query;

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Unauthorized user');
        socket.disconnect();
        return;
      }

      const userId = decoded.id;
      sockets[userId] = socket;

      User.findById(userId, (err1, user) => {
        if (err1) {
          console.log('Connection error');
          socket.disconnect();
          return;
        }

        socket.on('disconnect', () => {
          console.log(`[INFO] User ${userId} disconnected!`);
          socket.broadcast.emit('userDisconnect', { userId });
        });

        socket.on('sendchat', (text) => {
          console.log(user);

          const msg = new Message({
            userId,
            name: user.name,
            time: new Date().getTime(),
            text,
          });
          msg.save();

          const data = {
            msg: {
              ...msg.toObject(),
              name: user.name,
            },
          };

          socket.emit('receivemsg', data);
          socket.broadcast.emit('receivemsg', data);
        });
      });
    });
  });
};

export default initSocketIO;
