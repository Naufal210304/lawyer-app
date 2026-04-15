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

    const profile_pic = req.file ? `/uploads/${req.file.filename}` : null;

    const userData = {
      username,
      email,
      phone_number,
      profile_pic,
    };

    await userService.updateUser(id, userData);

    // Fetch updated user data to return complete profile
    const updatedUser = await userService.getUserById(id);

    res.json({
      message: 'User profile updated successfully',
      data: updatedUser
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

// 🗑️ DELETE user (superadmin only or self-delete)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    const currentUserId = parseInt(req.user.id);

    console.log('Delete request - Current user:', currentUserId, 'Role:', req.user.role, 'Target user:', userId); // DEBUG

    // Allow delete if: superadmin OR user deleting their own account
    if (req.user.role !== 'superadmin' && currentUserId !== userId) {
      return res.status(403).json({ message: 'Only superadmin can delete other users' });
    }

    await userService.deleteUser(userId);

    res.json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error); // DEBUG
    res.status(500).json({ message: 'Failed to delete user' });
  }
};