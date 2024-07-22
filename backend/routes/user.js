require('dotenv').config();
const express = require('express');
const router = express.Router();
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const app = express();
const authMiddleware = require('../middleware/authmiddleware');

const signUpSchema = zod.object({
  email: zod.string().email({ message: 'Please enter a valid email' }),
  name: zod
    .string()
    .max(32, { message: 'Name can only be of max length 32' })
    .min(1, { message: 'Name can only be of min length 1' }),
  password: zod
    .string()
    .max(16, { message: 'Password can only be of max length 16' })
    .min(8, { message: 'Password can only be of min length 8' }),
});

router.post('/signup', async (req, res) => {
  const body = req.body;
  const { success, error } = signUpSchema.safeParse(body);
  if (!success && error) {
    return res.status(411).json({
      message: error.message,
    });
  }
  const existingUser = User.findOne({
    email: body.email,
  });
  if (existingUser != null) {
    return res.json({
      message: 'An account with same email already exist.',
    });
  }
  try {
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    const userId = newUser._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    if (newUser) {
      return res.status(200).json({
        authToken: token,
        name: newUser.name,
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: 'Failed to create a new user',
      error: error,
    });
  }
});

const signInSchema = zod.object({
  email: zod.string().email({ message: 'Email please check email format' }),
  password: zod
    .string()
    .max(16, { message: 'Password can only be of max length 16' })
    .min(8, { message: 'Password can only be of min length 8' }),
});

router.post('/signIn', async (req, res) => {
  const { success, error } = signInSchema.safeParse(req.body);
  if (!success && error) {
    return res.status(401).json({
      message: 'Failed to log in',
      error: error,
    });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
      password,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    if (user) {
      res.status(200).json({
        message: 'Signed In Successfuly',
        authToken: token,
        name: user.name,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Failed to sign in',
      error: error,
    });
  }
});

//To Update User details
const updateSchema = zod.object({
  name: zod.string().optional(),
  email: zod
    .string()
    .email({ message: 'Please check email format' })
    .optional(),
  password: zod
    .string()
    .max(16, { message: 'Password can only be of max length 16' })
    .min(8, { message: 'Password can only be of min length 8' })
    .optional(),
});
router.put('/updateUser', authMiddleware, (req, res) => {
  const body = req.body;
  const { success, error } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: 'Failed to update',
      error,
    });
  }
  User.updateOne({ _id: req.userId }, { $set: body }).catch((rej) => {
    return res.status(411).json({
      message: 'Failed to update please try again later.',
      error: rej,
    });
  });
  res.status(200).json({
    message: 'Updated successfuly',
  });
});

router.get('/getSavedCharacters', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.userId,
    });
    const charactersArray = user.savedCharacters;
    if (charactersArray == null) {
      return res.status(401).json({
        message: 'Character array is empty',
      });
    }
    return res.status(200).json({
      message: 'Fetched characters array successfuly',
      savedCharacters: charactersArray,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Failed to fetch saved characters',
      error: error,
    });
  }
});

module.exports = router;
