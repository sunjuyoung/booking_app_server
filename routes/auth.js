import express from 'express';
import { login, registerUser } from '../controllers/authController.js';
import loginLimiter from '../middleware/loginLimiter.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginLimiter, login);

export default router;
