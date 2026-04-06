// routes/gas.js
const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { verifyToken } = require('../middleware/auth');

// GET /api/gas-shops  – query: ?district=Colombo&provider=Litro&cylinder=12.5kg
router.get('/', async (req, res) => {
  try {
    const { district, provider, cylinder } = req.query;
    let query = `
      SELECT g.*,
        json_object_agg(gss.cylinder_size, gss.status) AS stock,
        MAX(gss.last_updated) AS stock_updated
      FROM gas_shops g
      LEFT JOIN gas_shop_stock gss ON gss.shop_id = g.id
    `;
    const conditions = [];
    const params = [];
    if (district) { params.push(district); conditions.push(`g.district = $${params.length}`); }
    if (provider && provider !== 'Both') {
      params.push(provider);
      conditions.push(`(g.provider = $${params.length} OR g.provider = 'Both')`);
    }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' GROUP BY g.id ORDER BY g.district, g.name';

    const result = await db.query(query, params);
    let shops = result.rows;
    if (cylinder) {
      shops = shops.filter(s => s.stock && s.stock[cylinder] !== undefined);
    }
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/gas-shops/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT g.*,
        json_object_agg(gss.cylinder_size, gss.status) AS stock
      FROM gas_shops g
      LEFT JOIN gas_shop_stock gss ON gss.shop_id = g.id
      WHERE g.id = $1
      GROUP BY g.id
    `, [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, error: 'Gas shop not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/gas-shops/:id/stock – owner updates cylinder availability
router.post('/:id/stock', verifyToken, async (req, res) => {
  try {
    const { cylinder_size, status } = req.body;
    if (!cylinder_size || !status) {
      return res.status(400).json({ success: false, error: 'cylinder_size and status required' });
    }
    await db.query(`
      INSERT INTO gas_shop_stock (shop_id, cylinder_size, status, last_updated)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (shop_id, cylinder_size)
      DO UPDATE SET status = $3, last_updated = NOW()
    `, [req.params.id, cylinder_size, status]);

    res.json({ success: true, message: 'Gas stock updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH /api/gas-shops/:id/status – Bulk admin update (status + details + coordinates)
router.patch('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { fuels, lat, lng, name, address, district } = req.body;
    const queries = [];

    // 1. Update shop details
    const updateFields = [];
    const updateParams = [];
    if (name) { updateFields.push(`name = $${updateParams.length + 1}`); updateParams.push(name); }
    if (address) { updateFields.push(`address = $${updateParams.length + 1}`); updateParams.push(address); }
    if (district) { updateFields.push(`district = $${updateParams.length + 1}`); updateParams.push(district); }
    if (lat !== null && typeof lat === 'number') { updateFields.push(`lat = $${updateParams.length + 1}`); updateParams.push(lat); }
    if (lng !== null && typeof lng === 'number') { updateFields.push(`lng = $${updateParams.length + 1}`); updateParams.push(lng); }

    if (updateFields.length > 0) {
      updateParams.push(req.params.id);
      queries.push(db.query(`UPDATE gas_shops SET ${updateFields.join(', ')} WHERE id = $${updateParams.length}`, updateParams));
    }

    // 2. Update stock
    if (fuels) {
      Object.entries(fuels).forEach(([size, status]) => {
        queries.push(db.query(`
          INSERT INTO gas_shop_stock (shop_id, cylinder_size, status, last_updated)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (shop_id, cylinder_size)
          DO UPDATE SET status = $3, last_updated = NOW()
        `, [req.params.id, size, status]));
      });
    }

    await Promise.all(queries);
    res.json({ success: true, message: 'Gas shop details and stock updated' });
  } catch (err) {
    console.error('❌ Gas Shop Update Error:', err);
    res.status(500).json({ success: false, error: 'Database update failed' });
  }
});

module.exports = router;

