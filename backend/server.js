// server.js – FuelPass SL Express API server
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 4000;

// ---- Middleware ----
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || /localhost:\d+|127\.0\.0\.1:\d+|fuelpass-sl.*\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet()); // Fortress Header Security v28K
app.use(express.json());

// ---- Specialized Rate Limiters (v=33K-LIMITER-FIX) ----

// 1. Strict Limiter: Neutralizing Brute-Force on Login/Register
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, 
  message: { success: false, error: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Lenient Limiter: Allowing High-Performance Admin/User Management
const managementLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 1,000,000% more headroom for national admin tasks
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Prevent browser caching for all API routes
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// ---- Health check ----
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ---- API Routes ----
app.use('/api/auth',     authLimiter,       require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));
app.use('/api/gas-shops',require('./routes/gas'));
app.use('/api/prices',   require('./routes/prices'));
app.use('/api/reports',  managementLimiter, require('./routes/reports'));
app.use('/api/owners',   managementLimiter, require('./routes/owners'));
app.use('/api/contact',  managementLimiter, require('./routes/contact'));

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
