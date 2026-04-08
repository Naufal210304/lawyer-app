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
    const { username, email, password, phone_number } = req.body;

    const role_id = 2; // default admin

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    await userService.registerUser({ username, email, password, phone_number, role_id });

    res.json({ message: 'Registration successful. Waiting for approval from admin.' });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

const me = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role_id === 1 ? 'superadmin' : 'admin'
      }
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ message: 'Failed to get user data' });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can view pending users' });
    }

    const pendingUsers = await userService.getPendingUsers();
    res.json({
      success: true,
      message: 'Pending users fetched successfully',
      data: pendingUsers
    });
  } catch (error) {
    console.error('GetPendingUsers error:', error);
    res.status(500).json({ message: 'Failed to get pending users' });
  }
};

const approvePendingUser = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can approve users' });
    }

    const { id } = req.params;
    const approvedUser = await userService.approvePendingUser(id);
    res.json({
      success: true,
      message: 'User approved successfully',
      data: approvedUser
    });
  } catch (error) {
    console.error('ApprovePendingUser error:', error);
    res.status(500).json({ message: error.message || 'Failed to approve user' });
  }
};

const rejectPendingUser = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can reject users' });
    }

    const { id } = req.params;
    const deleted = await userService.deletePendingUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Pending user not found' });
    }
    res.json({ success: true, message: 'Pending user rejected' });
  } catch (error) {
    console.error('RejectPendingUser error:', error);
    res.status(500).json({ message: 'Failed to reject user' });
  }
};

module.exports = { login, register, me, getPendingUsers, approvePendingUser, rejectPendingUser };