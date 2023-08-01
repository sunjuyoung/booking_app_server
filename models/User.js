import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: [
      {
        type: String,
        default: 'Employee',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);
