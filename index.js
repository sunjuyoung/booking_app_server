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

const app = express();
const PORT = process.env.PORT || 8800;
dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(logger);

app.use('/api/auth', authRouter);
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
