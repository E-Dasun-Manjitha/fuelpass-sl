// routes/prices.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET /api/prices
router.get('/', async (req, res) => {
  try {
    const [fuelResult, gasResult] = await Promise.all([
      db.query('SELECT * FROM fuel_prices ORDER BY provider, id'),
      db.query('SELECT * FROM gas_prices ORDER BY provider, id'),
    ]);

    const cpc   = fuelResult.rows.filter(r => r.provider === 'CPC');
    const ioc   = fuelResult.rows.filter(r => r.provider === 'IOC');
    const litro  = gasResult.rows.filter(r => r.provider === 'Litro');
    const laugfs = gasResult.rows.filter(r => r.provider === 'LAUGFS');

    res.json({
      success: true,
      data: {
        fuelPrices: { cpc, ioc },
        gasPrices:  { litro, laugfs },
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT /api/prices/:id  (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { price } = req.body;
    await db.query(
      'UPDATE fuel_prices SET prev_price = price, price = $1, updated_at = NOW() WHERE id = $2',
      [price, req.params.id]
    );
    res.json({ success: true, message: 'Price updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PUT /api/prices/bulk (admin only)
router.put('/bulk', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { updates } = req.body;
    for (const u of updates) {
      // Look up and update fuel_prices or gas_prices depending on the request criteria
      // Our frontend bulk updates pass `type` and `price`.
      // We can update fuel and gas based on type matching.
      await db.query(
        "UPDATE fuel_prices SET prev_price = price, price = $1, updated_at = NOW() WHERE fuel_type = $2",
        [u.price, u.type]
      );
      await db.query(
        "UPDATE gas_prices SET prev_price = price, price = $1, updated_at = NOW() WHERE provider || ' ' || size = $2",
        [u.price, u.type]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
