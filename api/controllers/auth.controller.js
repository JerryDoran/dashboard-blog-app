import User from '../models/user.model.js';
import { errorHandler } from '../lib/error.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

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

export async function signin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required.'));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User does not exist.'));
    }

    const isMatch = await bcryptjs.compare(password, validUser.password);

    if (!isMatch) {
      return next(errorHandler(401, 'Invalid credentials.'));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    const { password: userPassword, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    // next(errorHandler(500, 'Something went wrong')); // custom error handler
    next(error);
  }
}

export async function googleSignin(req, res, next) {
  const { email, name, profilePic } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = await User.create({
        username:
          name.split(' ').join('').toLowerCase() +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilePic,
      });
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    // next(errorHandler(500, 'Something went wrong')); // custom error handler
    next(error);
  }
}
