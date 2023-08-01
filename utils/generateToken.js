import jwt from 'jsonwebtoken';

const generateToken = (res, findUser) => {
  const refreshToken = jwt.sign({ username: findUser.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
