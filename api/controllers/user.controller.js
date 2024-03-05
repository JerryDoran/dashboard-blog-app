import bcryptjs from 'bcryptjs';
import { errorHandler } from '../lib/error.js';
import User from '../models/user.model.js';

export async function updateUser(req, res, next) {
  // Check if user is updating their own account
  if (req.user.id !== req.params.userid) {
    return next(errorHandler(401, 'You can only update your account'));
  }

  // Check if user is entering a valid password
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Check if user is entering a valid username
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 3 and 20 characters')
      );
    }

    // Check if username contains spaces
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }

    // Check if username is lowercase
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }

    // Check if username contains special characters
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userid,
      {
        // specify which fields to update for security purposes
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      // this gives me the new updated user
      { new: true }
    );
    // separate out the password from the response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ success: true, ...rest });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.userid) {
    return next(errorHandler(401, 'You can only delete your account'));
  }

  try {
    await User.findByIdAndDelete(req.params.userid);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
}
