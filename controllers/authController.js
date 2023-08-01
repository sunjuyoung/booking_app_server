import asynceHandler from 'express-async-handler';
import User from '../models/User.js';

/**
 * @route POST api/auth/register
 * @desc POST register user
 */
const registerUser = asynceHandler(async (req, res) => {
  const { username, password, email } = req.body;

  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(400).json({ message: 'already exist user' });
  }

  const hashPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: hashPwd,
    email,
  });
  if (newUser) {
    return res.status(201).json({ message: 'create newUser' });
  } else {
    return res.status(400).json({ message: 'faild create user' });
  }
});

export { registerUser };
