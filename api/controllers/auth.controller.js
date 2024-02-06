import User from '../models/user.model.js';

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
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: 'User sucessfully created.', user });
  } catch (error) {
    // next(errorHandler(500, 'Something went wrong')); // custom error handler
    next(error);
  }
}
