// middleware/auth.js – JWT verification middleware
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ success: false, error: 'Access token required' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }
  next();
}

module.exports = { verifyToken, requireAdmin };
