const bcrypt = require('bcryptjs');
const userModel = require('./user.model');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const authenticateUser = async (identifier, password) => {
  const user = await userModel.findUserByUsernameOrEmail(identifier);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user;
};

const registerUser = async (userData) => {
  const { password, ...otherData } = userData;
  const hashedPassword = await hashPassword(password);
  return await userModel.createUser({ ...otherData, password: hashedPassword });
};

module.exports = {
  authenticateUser,
  registerUser
};