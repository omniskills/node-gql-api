import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  time: Number,
  text: {
    type: String,
    required: true,
  },
}, { collection: 'Message' });

if (!MessageSchema.options.toObject) {
  MessageSchema.options.toObject = {};
}

MessageSchema.options.toObject.transform = (doc, ret) => ({
  id: ret._id,
  time: ret.time,
  text: ret.text,
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
