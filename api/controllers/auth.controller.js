import User from '../models/user.model.js';
import { errorHandler } from '../lib/error.js';

export async function signup(req, res, next) {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required.'));
  }

  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: 'User sucessfully created.', user });
  } catch (error) {
    // next(errorHandler(500, 'Something went wrong')); // custom error handler
    next(error);
  }
}
