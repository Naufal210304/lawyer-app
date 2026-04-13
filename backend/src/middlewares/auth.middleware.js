const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT secret is not configured');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware token error:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};