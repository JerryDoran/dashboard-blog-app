import express from 'express';
import { updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../lib/verifyUser.js';

const router = express.Router();

// router.get('/test', test);
router.put('/update/:userid', verifyToken, updateUser);
router.delete('/delete/:userid', verifyToken, deleteUser);

export default router;
