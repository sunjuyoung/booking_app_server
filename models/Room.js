import e from 'express';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    rommNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }],
  },
  {
    timestamps: true,
  },
);

// rommNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }],
// [
//   {number:101, unavailableDates: [01.05.2022, 02.05.2022]},
//   {number:102, unavailableDates: [Date]},
//   ...
// ]

export default mongoose.model('Room', roomSchema);
