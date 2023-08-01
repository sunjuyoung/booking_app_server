import e from 'express';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Room', roomSchema);
