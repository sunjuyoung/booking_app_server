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
    { expiresIn: '10s' },
  );
  //create refreshToken, cookie
  //generateToken(res, findUser);
  const refreshToken = jwt.sign({ username: findUser.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  //refreshToken save to db
  findUser.refreshToken = refreshToken;
  await findUser.save();

  return res.status(200).json({
    _id: findUser._id,
    username: findUser.username,
    email: findUser.email,
    roles: findUser.roles,
    accessToken,
  });
});

/**
 * @route POST api/auth/refresh_token
 *  @desc POST refresh token
 */
const handleRefreshToken = asynceHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.status(400).json({ message: 'no cookie' });
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.status(400).json({ message: 'no user' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.status(400).json({ message: 'no user' });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' },
    );
    res.status(200).json({ accessToken });
  });
});

export { registerUser, login, handleRefreshToken };
