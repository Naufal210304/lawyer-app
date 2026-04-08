const bcrypt = require('bcryptjs');
const userModel = require('./user.model');

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
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

// REGISTER
const registerUser = async (userData) => {
  let { username, email, password, role_id } = userData;

  // sanitasi
  username = username.trim();
  email = email.trim();

  // cek user sudah ada
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  return await userModel.createUser({
    username,
    email,
    password: hashedPassword,
    role_id
  });
};

module.exports = {
  authenticateUser,
  registerUser
};