import jwt from 'jsonwebtoken';
import { users } from '../data/users.js';
import logger from '../middlewares/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';

export const register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // In a real app, hash the password here
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password // Don't store plain text in real app!
    };

    users.push(newUser);
    logger.info(`New user registered: ${email}`);

    // Create token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token
    });
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email);
    
    // In a real app, compare hashed passwords
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    
    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    logger.error(`GetMe error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
