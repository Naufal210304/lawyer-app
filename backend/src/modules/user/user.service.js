const bcrypt = require('bcryptjs');
const userModel = require('./user.model');

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// GET ALL USERS
const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

// GET USER BY ID
const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

// DELETE USER
const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// LOGIN
const authenticateUser = async (identifier, password) => {
  // sanitasi input
  const cleanIdentifier = identifier.trim();

  const user = await userModel.findUserByUsernameOrEmail(cleanIdentifier);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // mapping role di service (lebih clean)
  const role = user.role_id === 1 ? 'superadmin' : 'admin';

  return {
    ...user,
    role
  };
};

// REGISTER - Now creates pending user
const registerUser = async (userData) => {
  let { username, email, password, phone_number, role_id } = userData;

  // sanitasi
  username = username.trim();
  email = email.trim();

  // cek user sudah ada di users table
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  // cek juga di pending_users table
  const existingPendingUser = await userModel.findPendingUserByEmail(email);

  if (existingPendingUser) {
    throw new Error('Registration pending. Awaiting admin approval');
  }

  const hashedPassword = await hashPassword(password);

  // Insert ke pending_users instead of users
  return await userModel.createPendingUser({
    username,
    email,
    password: hashedPassword,
    phone_number,
    role_id: role_id || 2 // default admin
  });
};

// GET PENDING USERS
const getPendingUsers = async () => {
  return await userModel.getPendingUsers();
};

// APPROVE PENDING USER
const approvePendingUser = async (id) => {
  return await userModel.approvePendingUser(id);
};

// UPDATE USER
const updateUser = async (id, userData) => {
  return await userModel.updateUser(id, userData);
};

// UPDATE PASSWORD
const updatePassword = async (id, oldPassword, newPassword) => {
  const user = await userModel.getUserByIdWithPassword(id);
  if (!user) {
    throw new Error('User not found');
  }

  const isOldPasswordValid = await verifyPassword(oldPassword, user.password);
  if (!isOldPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedNewPassword = await hashPassword(newPassword);
  return await userModel.updateUserPassword(id, hashedNewPassword);
};

// DELETE PENDING USER
const deletePendingUser = async (id) => {
  return await userModel.deletePendingUser(id);
};

module.exports = {
  authenticateUser,
  registerUser,
  updateUser,
  updatePassword,
  getAllUsers,
  getUserById,
  deleteUser,
  getPendingUsers,
  approvePendingUser,
  deletePendingUser
};