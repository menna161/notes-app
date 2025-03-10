// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Ensure this matches what your tests expect

// Add generateToken helper function
exports.generateToken = (user) => {
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const token = exports.generateToken(user);
  res.status(200).json({ token });
};
