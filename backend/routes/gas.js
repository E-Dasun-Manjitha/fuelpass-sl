// routes/gas.js
const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET /api/gas-shops  – query: ?district=Colombo&provider=Litro&cylinder=12.5kg
router.get('/', async (req, res) => {
  try {
    const { district, provider, cylinder } = req.query;
    let baseQuery = `
      SELECT
        g.*,
        json_object_agg(gss.cylinder_size, gss.status) FILTER (WHERE gss.cylinder_size IS NOT NULL) AS stock,
        MAX(gss.last_updated) AS last_updated
      FROM gas_shops g
      LEFT JOIN gas_shop_stock gss ON gss.shop_id = g.id
    `;
    const conditions = [];
    const params = [];
    
    if (district) {
      params.push(district);
      conditions.push(`g.district = $${params.length}`);
    }
    if (provider && provider !== 'Both') {
      params.push(provider);
      conditions.push(`(g.provider = $${params.length} OR g.provider = 'Both')`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(' AND ');
    }
    baseQuery += ` GROUP BY g.id ORDER BY g.district, g.name`;

    const result = await db.query(baseQuery, params);
    let shops = result.rows;

    // Filter by cylinder size if specified (post-aggregation)
    if (cylinder) {
      shops = shops.filter(s => s.stock && s.stock[cylinder] !== undefined);
    }
    
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) {
    console.error('❌ Gas GET Error:', err);
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
    const { lat, lng, name, address, district, last_delivery, next_delivery } = req.body;
    const fuels = req.body.fuels || req.body.stock;
    const id = req.params.id;
    const provider = req.body.provider || req.body.company || 'Both';

    console.log(`[GAS-UPDATE] Request for ID: ${id}, Name: ${name}`);

    // 1. Core Primary Upsert: Ensure the gas shop exists
    await db.query(`
      INSERT INTO gas_shops (id, name, provider, district, address, lat, lng, last_delivery, next_delivery)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) 
      DO UPDATE SET 
        name = EXCLUDED.name, 
        provider = EXCLUDED.provider, 
        district = EXCLUDED.district, 
        address = EXCLUDED.address, 
        lat = EXCLUDED.lat, 
        lng = EXCLUDED.lng,
        last_delivery = EXCLUDED.last_delivery,
        next_delivery = EXCLUDED.next_delivery
    `, [
      id, name || 'Unknown', provider, district || 'Unknown', address || 'No Address', 
      lat || 0, lng || 0, last_delivery || '', next_delivery || ''
    ]);

    // 2. Update status records in 'gas_shop_stock'
    if (fuels && typeof fuels === 'object') {
      const stockQueries = Object.entries(fuels).map(([size, status]) => {
        const normalizedSize = size.toLowerCase().replace(/\s+/g, '');
        const allowedSizes = ['5kg','12.5kg','37.5kg','2.3kg'];
        if (!allowedSizes.includes(normalizedSize)) return Promise.resolve();

        return db.query(`
          INSERT INTO gas_shop_stock (shop_id, cylinder_size, status, last_updated)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (shop_id, cylinder_size)
          DO UPDATE SET status = $3, last_updated = NOW()
        `, [id, normalizedSize, status]);
      });
      await Promise.all(stockQueries);
    }

    res.json({ success: true, message: 'Gas shop details and stock updated' });
  } catch (err) {
    console.error('❌ Gas Shop Update Error:', err);
    res.status(500).json({ success: false, error: err.message || 'Database update failed' });
  }
});

module.exports = router;

