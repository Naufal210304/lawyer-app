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