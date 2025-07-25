import express from 'express';
const router = express.Router();

import { signup, login } from '../controller/auth.controller.js';
router.post('/sign-up', signup)
router.post('/login', login)

export default router;
