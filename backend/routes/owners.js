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

// POST /api/owners – create owner AND populate stations db!
router.post('/', async (req, res) => {
  try {
    const { station_code, station_name, owner_name, email, mobile, password, company, district, address, phone } = req.body;
    if (!station_code || !owner_name || !password) {
      return res.status(400).json({ success: false, error: 'station_code, owner_name & password required' });
    }
    const hash = await bcrypt.hash(password, 12);
    
    // Automatically Add to Stations / Gas Shops tables!
    // Generate a clean ID from the station code
    const stId = station_code.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isGas = ['Litro', 'LAUGFS', 'Both'].includes(company);
    const lat = 6.9 + (Math.random()*0.1); // Placeholder coordinates
    const lng = 79.9 + (Math.random()*0.1);

    if (isGas) {
       await db.query(`INSERT INTO gas_shops (id, name, provider, district, address, lat, lng, phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`, [stId, station_name, company, district || 'Colombo', address || 'N/A', lat, lng, phone]);
       await db.query(`INSERT INTO gas_shop_stock (shop_id, cylinder_size, status) VALUES ($1,'12.5kg','available'),($1,'5kg','available'),($1,'37.5kg','available') ON CONFLICT DO NOTHING`, [stId]);
    } else {
       await db.query(`INSERT INTO stations (id, name, company, district, address, lat, lng, phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`, [stId, station_name, company, district || 'Colombo', address || 'N/A', lat, lng, phone]);
       await db.query(`INSERT INTO station_fuel_status (station_id, fuel_type, status, queue) VALUES ($1,'petrol92','available','none'),($1,'petrol95','available','none'),($1,'diesel','available','none'),($1,'superDiesel','available','none') ON CONFLICT DO NOTHING`, [stId]);
    }

    const result = await db.query(`
      INSERT INTO owners (station_id, station_code, station_name, owner_name, email, mobile, password_hash, approved)
      VALUES ($1,$2,$3,$4,$5,$6,$7,true) RETURNING id, station_code, station_name, owner_name
    `, [stId, station_code.toUpperCase(), station_name, owner_name, email, mobile, hash]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ success: false, error: 'Station code already exists' });
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/owners/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete the owner
    const ownerRes = await db.query('DELETE FROM owners WHERE id = $1 RETURNING station_id', [req.params.id]);
    
    // Also delete the station/gas shop from public view when owner is deleted
    if (ownerRes.rows.length > 0 && ownerRes.rows[0].station_id) {
       const sId = ownerRes.rows[0].station_id;
       await db.query('DELETE FROM stations WHERE id = $1', [sId]);
       await db.query('DELETE FROM gas_shops WHERE id = $1', [sId]);
    }
    res.json({ success: true, message: 'Owner removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
