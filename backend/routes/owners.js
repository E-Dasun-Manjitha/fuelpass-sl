// routes/owners.js  – admin-only owner management
const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const db      = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// All routes require admin JWT
router.use(verifyToken, requireAdmin);

// GET /api/owners
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, station_code, station_name, owner_name, email, mobile, approved, created_at FROM owners ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/owners – create owner
router.post('/', async (req, res) => {
  try {
    const { station_code, station_name, owner_name, email, mobile, password } = req.body;
    if (!station_code || !owner_name || !password) {
      return res.status(400).json({ success: false, error: 'station_code, owner_name & password required' });
    }
    const hash = await bcrypt.hash(password, 12);
    const result = await db.query(`
      INSERT INTO owners (station_code, station_name, owner_name, email, mobile, password_hash, approved)
      VALUES ($1,$2,$3,$4,$5,$6,true) RETURNING id, station_code, station_name, owner_name
    `, [station_code.toUpperCase(), station_name, owner_name, email, mobile, hash]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ success: false, error: 'Station code already exists' });
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/owners/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM owners WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Owner removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
