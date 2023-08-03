import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
    roles: {
      type: [String],
      default: ['Employee'],
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

//로그인 패스워드 확인
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
