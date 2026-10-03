import { Router } from 'express';
import { login, register } from '../controller/authController';

const router = Router();

console.log('Setting up auth routes...'); // Debugging log
router.post('/login', login);
router.post('/register', register);

export default router;