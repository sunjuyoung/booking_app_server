import asynceHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

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

/**
 * @route POST api/auth/login
 * @desc POST login user
 */
const login = asynceHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser && !(await findUser.matchPassword(password))) {
    return res.status(400).json({ message: 'please check your email or password' });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: findUser.username,
        roles: findUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );
  //create refreshToken, cookie
  generateToken(res, findUser);

  return res.status(200).json({
    _id: findUser._id,
    username: findUser.username,
    email: findUser.email,
    roles: findUser.roles,
    accessToken,
  });
});

export { registerUser, login };
