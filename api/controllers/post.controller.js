import { errorHandler } from '../lib/error.js';
import Post from '../models/post.model.js';

export async function createPost(req, res, next) {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create posts'));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Title and content are required'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');

  // Create a new post
  const newPost = new Post({ ...req.body, slug, userId: req.user.id });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({ message: 'Post created', post: savedPost });
  } catch (error) {
    next(error);
  }
}
