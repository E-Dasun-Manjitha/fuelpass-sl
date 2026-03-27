// server.js – FuelPass SL Express API server
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 4000;

// ---- Middleware ----
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    process.env.FRONTEND_URL || '*',        // Vercel URL set in env
  ],
  credentials: true,
}));
app.use(express.json());

// ---- Health check ----
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ---- API Routes ----
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));
app.use('/api/gas-shops',require('./routes/gas'));
app.use('/api/prices',   require('./routes/prices'));
app.use('/api/reports',  require('./routes/reports'));
app.use('/api/owners',   require('./routes/owners'));

// ---- 404 ----
app.use((req, res) => res.status(404).json({ success: false, error: 'Endpoint not found' }));

// ---- Error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ FuelPass SL API running on port ${PORT}`);
});
