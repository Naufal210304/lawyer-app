const jwt = require('jsonwebtoken');
const userService = require('../user/user.service');

const login = async (req, res) => {
  try {
    const { identifier, username, password } = req.body;

    const loginIdentifier = identifier || username;

    if (!loginIdentifier || !password) {
      return res.status(400).json({ message: 'Username/email and password are required' });
    }

    const user = await userService.authenticateUser(loginIdentifier, password);

    const role = user.role_id === 1 ? 'superadmin' : 'admin';

    const token = jwt.sign(
      { id: user.id, username: user.username, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      role,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message || 'Login failed' });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const role_id = 2; // default admin

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    await userService.registerUser({ username, email, password, role_id });

    res.json({ message: 'Registration successful' });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

module.exports = { login, register };