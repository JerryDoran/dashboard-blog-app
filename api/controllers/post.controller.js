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

export async function getPosts(req, res, next) {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortOrder })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
}
