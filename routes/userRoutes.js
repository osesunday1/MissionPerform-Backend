import express from 'express';
import { getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById); // GET /api/v1/users/:id

export default router;