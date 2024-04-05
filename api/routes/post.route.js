import express from 'express';
import {
  createPost,
  getPosts,
  deletePost,
} from '../controllers/post.controller.js';
import { verifyToken } from '../lib/verifyUser.js';

const router = express.Router();

router.get('/get-posts', getPosts);
router.post('/create', verifyToken, createPost);
router.delete('/delete/:postid/:userid', verifyToken, deletePost);

export default router;
