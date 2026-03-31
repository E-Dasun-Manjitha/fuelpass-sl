// routes/reports.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// GET /api/reports  – query: ?verified=true&limit=20
router.get('/', async (req, res) => {
  try {
    const { verified, limit = 20 } = req.query;
    let query = 'SELECT * FROM reports';
    const params = [];
    if (verified !== undefined) {
      params.push(verified === 'true');
      query += ` WHERE verified = $1`;
    }
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
    params.push(parseInt(limit));

    const result = await db.query(query, params);
    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/reports – community report (no auth required)
router.post('/', async (req, res) => {
  try {
    const { station_name, product, status, queue, notes } = req.body;
    if (!station_name || !status) return res.status(400).json({ success: false, error: 'station_name and status required' });

    const result = await db.query(`
      INSERT INTO reports (station_name, product, status, queue, notes, verified, reporter)
      VALUES ($1,$2,$3,$4,$5,false,'Community')
      RETURNING *
    `, [station_name, product, status, queue || 'none', notes]);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/reports/verified – owner verified report (auth required)
router.post('/verified', verifyToken, async (req, res) => {
  try {
    const { station_name, product, status, queue, notes } = req.body;
    if (!station_name || !status) return res.status(400).json({ success: false, error: 'Missing required fields' });

    const result = await db.query(`
      INSERT INTO reports (station_name, product, status, queue, notes, verified, reporter, station_code)
      VALUES ($1,$2,$3,$4,$5,true,$6,$7)
      RETURNING *
    `, [station_name, product, status, queue || 'none', notes,
        req.user.owner_name || 'Verified Owner', req.user.station_code]);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE /api/reports/:id – Admin removes a report (requires admin token)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM reports WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.json({ success: true, message: `Report ${id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH /api/reports/:id/verify – Admin marks report as verified and updates station
router.patch('/:id/verify', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const reportRes = await db.query('SELECT * FROM reports WHERE id = $1', [id]);
    if (!reportRes.rows.length) return res.status(404).json({ success: false, error: 'Report not found' });
    const r = reportRes.rows[0];

    // Mark verified
    await db.query('UPDATE reports SET verified = true WHERE id = $1', [id]);

    // SYNC TO STATION (Auto-Update)
    if (r.station_code || r.station_name) {
       // Find station id by code or name
       let sId = r.station_code;
       if (!sId) {
          const sRes = await db.query('SELECT id FROM stations WHERE name = $1 LIMIT 1', [r.station_name]);
          if (sRes.rows.length) sId = sRes.rows[0].id;
       }

       if (sId && r.product && r.status) {
          await db.query(`
            INSERT INTO station_fuel_status (station_id, fuel_type, status, queue, last_updated, updated_by)
            VALUES ($1, $2, $3, $4, NOW(), 'verified-report')
            ON CONFLICT (station_id, fuel_type)
            DO UPDATE SET status=$3, queue=$4, last_updated=NOW(), updated_by='verified-report'
          `, [sId, r.product, r.status, r.queue || 'none']);
       }
    }

    res.json({ success: true, message: 'Report verified and station updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
