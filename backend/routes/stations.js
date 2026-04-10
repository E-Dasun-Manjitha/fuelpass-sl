// routes/stations.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET /api/stations  – query: ?district=Colombo&company=CPC&status=available
router.get('/', async (req, res) => {
  try {
    const { district, company, status } = req.query;
    let query = `
      SELECT
        s.*,
        json_object_agg(sfs.fuel_type, sfs.status)  AS fuels,
        json_object_agg(sfs.fuel_type, sfs.queue)   AS queues,
        MAX(sfs.last_updated)                        AS last_updated
      FROM stations s
      LEFT JOIN station_fuel_status sfs ON sfs.station_id = s.id
    `;
    const conditions = [];
    const params = [];
    if (district) { params.push(district); conditions.push(`s.district = $${params.length}`); }
    if (company)  { params.push(company);  conditions.push(`s.company = $${params.length}`); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' GROUP BY s.id ORDER BY s.district, s.name';

    const result = await db.query(query, params);
    let stations = result.rows;

    // Client-side status filter (after aggregation)
    if (status) {
      stations = stations.filter(s => {
        const vals = Object.values(s.fuels || {});
        if (status === 'available') return vals.some(v => v === 'available');
        if (status === 'limited')   return !vals.some(v => v === 'available') && vals.some(v => v === 'limited');
        if (status === 'out')       return vals.every(v => v === 'out');
        return true;
      });
    }

    res.json({ success: true, count: stations.length, data: stations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/stations/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.*,
        json_object_agg(sfs.fuel_type, sfs.status) AS fuels,
        json_object_agg(sfs.fuel_type, sfs.queue)  AS queues,
        MAX(sfs.last_updated) AS last_updated
      FROM stations s
      LEFT JOIN station_fuel_status sfs ON sfs.station_id = s.id
      WHERE s.id = $1
      GROUP BY s.id
    `, [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Station not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/stations/:id/status – owner or admin updates availability
router.post('/:id/status', verifyToken, async (req, res) => {
  try {
    const { fuel_type, status, queue } = req.body;
    if (!fuel_type || !status) return res.status(400).json({ success: false, error: 'fuel_type and status required' });

    await db.query(`
      INSERT INTO station_fuel_status (station_id, fuel_type, status, queue, last_updated, updated_by)
      VALUES ($1,$2,$3,$4,NOW(),$5)
      ON CONFLICT (station_id, fuel_type)
      DO UPDATE SET status=$3, queue=$4, last_updated=NOW(), updated_by=$5
    `, [req.params.id, fuel_type, status, queue || 'none', req.user.station_code || req.user.role]);

    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH /api/stations/:id/status – Bulk admin update (status + details + coordinates)
router.patch('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { fuels, queue, lat, lng, name, address, district } = req.body;
    const queries = [];
    
    // 1. Update station details (Name, Address, District, Location)
    const updateStationsFields = [];
    const updateStationsParams = [];
    if (name) { updateStationsFields.push(`name = $${updateStationsParams.length + 1}`); updateStationsParams.push(name); }
    if (address) { updateStationsFields.push(`address = $${updateStationsParams.length + 1}`); updateStationsParams.push(address); }
    if (district) { updateStationsFields.push(`district = $${updateStationsParams.length + 1}`); updateStationsParams.push(district); }
    if (lat !== null && typeof lat === 'number') { updateStationsFields.push(`lat = $${updateStationsParams.length + 1}`); updateStationsParams.push(lat); }
    if (lng !== null && typeof lng === 'number') { updateStationsFields.push(`lng = $${updateStationsParams.length + 1}`); updateStationsParams.push(lng); }
    
    if (updateStationsFields.length > 0) {
      updateStationsParams.push(req.params.id);
      queries.push(db.query(`UPDATE stations SET ${updateStationsFields.join(', ')} WHERE id = $${updateStationsParams.length}`, updateStationsParams));
    }

    // 2. Update fuel/gas availability
    if (fuels && typeof fuels === 'object') {
      Object.entries(fuels).forEach(([type, status]) => {
        // Normalize: '12.5 kg' -> '12.5kg', 'Petrol 95' -> 'petrol95'
        const normalizedType = type.toLowerCase().replace(/\s+/g, '');
        queries.push(db.query(`
          INSERT INTO station_fuel_status (station_id, fuel_type, status, queue, last_updated, updated_by)
          VALUES ($1, $2, $3, $4, NOW(), 'admin')
          ON CONFLICT (station_id, fuel_type)
          DO UPDATE SET status = $3, queue = $4, last_updated = NOW(), updated_by = 'admin'
        `, [req.params.id, normalizedType, status, queue || 'none']));
      });
    }

    await Promise.all(queries);
    res.json({ success: true, message: 'Station details and status updated' });
  } catch (err) {
    console.error('❌ Station Status Update Error:', err);
    res.status(500).json({ success: false, error: 'Database update failed' });
  }
});

// DELETE /api/stations/:id – Admin remove station
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    // Delete from related tables first
    await db.query('DELETE FROM station_fuel_status WHERE station_id = $1', [req.params.id]);
    const result = await db.query('DELETE FROM stations WHERE id = $1', [req.params.id]);
    
    if (result.rowCount === 0) return res.status(404).json({ success: false, error: 'Station not found' });
    res.json({ success: true, message: 'Station permanently removed from national network' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
