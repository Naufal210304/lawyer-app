const userService = require('./user.service');

// 🔍 GET semua user (untuk admin / superadmin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      message: 'Users fetched successfully',
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// 🔍 GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User fetched successfully',
      data: user
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// ✏️ UPDATE user profile
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone_number } = req.body;

    // Users can only update their own profile
    if (req.user.id != id) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const userData = {
      username,
      email,
      phone_number,
      profile_pic: req.file ? `/uploads/${req.file.filename}` : req.body.profile_pic,
    };

    await userService.updateUser(id, userData);

    res.json({
      message: 'User profile updated successfully',
      data: userData
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: error.message || 'Failed to update user profile' });
  }
};

// 🔐 UPDATE password
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { old_password, new_password } = req.body;

    // Users can only update their own password
    if (req.user.id != id) {
      return res.status(403).json({ message: 'You can only update your own password' });
    }

    if (!old_password || !new_password) {
      return res.status(400).json({ message: 'Old password and new password are required' });
    }

    await userService.updatePassword(id, old_password, new_password);

    res.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Update password error:', error);
    if (error.message === 'Current password is incorrect') {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    res.status(500).json({ message: error.message || 'Failed to update password' });
  }
};

// 🗑️ DELETE user (superadmin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can delete users' });
    }

    await userService.deleteUser(id);

    res.json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};