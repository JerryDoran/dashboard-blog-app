import express from 'express';
import { createPost } from '../controllers/post.controller.js';
import { verifyToken } from '../lib/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);

export default router;
