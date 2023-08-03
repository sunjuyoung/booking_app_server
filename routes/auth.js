import express from 'express';
import { login, registerUser, handleRefreshToken } from '../controllers/authController.js';
import loginLimiter from '../middleware/loginLimiter.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginLimiter, login);
router.get('/refreshToken', handleRefreshToken);

export default router;
