// routes/gas.js
const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET /api/gas-shops  – query: ?district=Colombo&provider=Litro&cylinder=12.5kg
router.get('/', async (req, res) => {
  try {
    const { district, provider, cylinder } = req.query;
    const result = await db.query(`
      SELECT
        g.*,
        json_object_agg(gas_shop_stock.tank_size, gas_shop_stock.status) FILTER (WHERE gas_shop_stock.tank_size IS NOT NULL) AS stock,
        MAX(gas_shop_stock.last_updated) AS last_updated
      FROM gas_shops g
      LEFT JOIN gas_shop_stock ON gas_shop_stock.shop_id = g.id
      GROUP BY g.id
      ORDER BY g.district, g.name
    `);
    const conditions = [];
    const params = [];
    if (district) { params.push(district); conditions.push(`g.district = $${params.length}`); }
    if (provider && provider !== 'Both') {
      params.push(provider);
      conditions.push(`(g.provider = $${params.length} OR g.provider = 'Both')`);
    }
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
    // Accept both 'fuels' and 'stock' field names from the frontend
    const { lat, lng, name, address, district, last_delivery, next_delivery } = req.body;
    const fuels = req.body.fuels || req.body.stock;
    const id = req.params.id;
    // 1. Primary Upsert for the gas shop itself
    const provider = req.body.provider || req.body.company;
    if (name && district && address && provider) {
       console.log(`[GAS] Performing primary UPSERT for gas shop: ${id} (${name})`);
       await db.query(`
          INSERT INTO gas_shops (id, name, provider, district, address, lat, lng)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) 
          DO UPDATE SET 
             name = EXCLUDED.name, 
             provider = EXCLUDED.provider, 
             district = EXCLUDED.district, 
             address = EXCLUDED.address, 
             lat = EXCLUDED.lat, 
             lng = EXCLUDED.lng
       `, [id, name, provider, district, address, lat || 0, lng || 0]);
    } else {
      // Fallback update
      const updateFields = [];
      const updateParams = [];
      if (name) { updateFields.push(`name = $${updateParams.length+1}`); updateParams.push(name); }
      if (provider) { updateFields.push(`provider = $${updateParams.length+1}`); updateParams.push(provider); }
      if (address) { updateFields.push(`address = $${updateParams.length+1}`); updateParams.push(address); }
      if (district) { updateFields.push(`district = $${updateParams.length+1}`); updateParams.push(district); }
      if (lat) { updateFields.push(`lat = $${updateParams.length+1}`); updateParams.push(lat); }
      if (lng) { updateFields.push(`lng = $${updateParams.length+1}`); updateParams.push(lng); }

      if (updateFields.length > 0) {
        updateParams.push(id);
        console.log(`[GAS] Performing partial UPDATE for gas shop: ${id}`);
        await db.query(`UPDATE gas_shops SET ${updateFields.join(', ')} WHERE id = $${updateParams.length}`, updateParams);
      }
    }

    // 2. Update stock availability
    if (fuels && typeof fuels === 'object') {
      console.log(`[GAS] Updating stock for ${id}:`, fuels);
      const stockQueries = [];
      Object.entries(fuels).forEach(([size, status]) => {
        // Validation: sizes must be in the format '12.5kg' etc.
        const normalizedSize = size.toLowerCase().replace(/\s+/g, '');
        const allowedSizes = ['2.3kg', '5kg', '12.5kg', '37.5kg'];
        if (!allowedSizes.includes(normalizedSize)) return;

        stockQueries.push(db.query(`
          INSERT INTO gas_shop_stock (shop_id, tank_size, status, last_updated)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (shop_id, tank_size)
          DO UPDATE SET status = $3, last_updated = NOW()
        `, [id, normalizedSize, status]));
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

