// routes/auth.js
const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const db      = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ success: false, error: 'Password required' });
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ success: true, token, role: 'admin' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/auth/owner-login
router.post('/owner-login', async (req, res) => {
  try {
    const { station_code, password } = req.body;
    if (!station_code || !password) return res.status(400).json({ success: false, error: 'station_code & password required' });

    const result = await db.query(
      'SELECT * FROM owners WHERE station_code = $1 AND approved = true',
      [station_code.toUpperCase()]
    );
    if (!result.rows.length) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const owner = result.rows[0];
    const valid = await bcrypt.compare(password, owner.password_hash);
    if (!valid) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: owner.id, station_code: owner.station_code, owner_name: owner.owner_name, role: 'owner' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      success: true, token, role: 'owner',
      owner: { station_code: owner.station_code, owner_name: owner.owner_name, station_name: owner.station_name }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
