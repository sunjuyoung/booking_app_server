import express from 'express';
import connectDB from './config/dbConn.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import hotelsRouter from './routes/hotels.js';
import roomsRouter from './routes/rooms.js';
import errorHandler from './middleware/errorHandler.js';
import { logger } from './middleware/logEvents.js';
import verifyJWT from './middleware/verifyJWT.js';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8800;
dotenv.config();

console.log(path.resolve() + '\\public\\images');

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger);
app.use(credentials);

app.use('/api/auth', authRouter);

//app.use(verifyJWT);

app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

app.all('*', (req, res) => {
  res.status(404);
  res.json({ error: '404 Not Found' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server port : ${PORT}`);
  });
});
