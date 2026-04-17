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
        json_object_agg(sfs.fuel_type, sfs.status) FILTER (WHERE sfs.fuel_type IS NOT NULL) AS fuels,
        json_object_agg(sfs.fuel_type, sfs.queue)  FILTER (WHERE sfs.fuel_type IS NOT NULL) AS queues,
        MAX(sfs.last_updated) AS last_updated
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
    const id = req.params.id;
    const company = req.body.company || 'CPC';

    console.log(`[STATION-UPDATE] Request for ID: ${id}, Name: ${name}`);

    // 1. Mandatory Primary Upsert: Ensure the station exists
    await db.query(`
      INSERT INTO stations (id, name, company, district, address, lat, lng)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) 
      DO UPDATE SET 
        name = EXCLUDED.name, 
        company = EXCLUDED.company, 
        district = EXCLUDED.district, 
        address = EXCLUDED.address, 
        lat = EXCLUDED.lat, 
        lng = EXCLUDED.lng
    `, [
      id, name || 'Unknown', company, district || 'Unknown', address || 'No Address', 
      lat || 0, lng || 0
    ]);

    // 2. Update fuel availability
    // Support both bulk 'fuels' object (admin) AND single 'fuel_type/status' (owner)
    let fuelData = fuels;
    if (!fuelData && req.body.fuel_type) {
      fuelData = { [req.body.fuel_type]: req.body.status };
    }

    if (fuelData && typeof fuelData === 'object') {
      // Normalize map: lowercase key → canonical DB key
      const fuelKeyMap = {
        'petrol92': 'petrol92',
        'petrol95': 'petrol95',
        'diesel': 'diesel',
        'autodiesel': 'diesel',
        'superdiesel': 'superDiesel',
        'superdiesel(euro4)': 'superDiesel',
        'superdiesel euro4': 'superDiesel',
        '5kg': '5kg',
        '12.5kg': '12.5kg',
        '37.5kg': '37.5kg',
        '2.3kg': '2.3kg',
      };

      const fuelQueries = Object.entries(fuelData).map(([type, status]) => {
        const lookupKey = type.toLowerCase().replace(/\s+/g, '');
        const canonicalType = fuelKeyMap[lookupKey];
        if (!canonicalType) {
          console.warn(`[STATION-UPDATE] Skipping unknown fuel type: "${type}" (normalized: "${lookupKey}")`);
          return Promise.resolve();
        }

        return db.query(`
          INSERT INTO station_fuel_status (station_id, fuel_type, status, queue, last_updated, updated_by)
          VALUES ($1, $2, $3, $4, NOW(), 'verified')
          ON CONFLICT (station_id, fuel_type)
          DO UPDATE SET status = $3, queue = $4, last_updated = NOW(), updated_by = 'verified'
        `, [id, canonicalType, status, queue || 'none']);
      });
      await Promise.all(fuelQueries);
    }

    console.log(`[STATION-UPDATE] Successfully updated station: ${id}`);
    res.json({ success: true, message: 'Station details and status updated' });
  } catch (err) {
    console.error('❌ Station Status Update Error:', err);
    res.status(500).json({ success: false, error: err.message || 'Database update failed' });
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
