import Message from '../models/message';
import logger from '../core/logger/app-logger';

const controller = {};

controller.getLast7Days = async (req, res) => {
  try {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const messages = await Message.find({
      time: { $gt: date.getTime() },
    }).populate('userId');

    const data = messages.map(msg => ({
      ...msg.toObject(),
      name: msg.name,
    }));

    console.log(data);
    logger.info('sending all cars...');
    res.send(data);
  } catch (err) {
    logger.error(`Error in getting cars- ${err}`);
    res.send('Got error in getAll');
  }
};

export default controller;
