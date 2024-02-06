import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to the database!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
