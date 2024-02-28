import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../lib/verifyUser.js';

const router = express.Router();

// router.get('/test', test);
router.put('/update/:userid', verifyToken, updateUser);

export default router;
