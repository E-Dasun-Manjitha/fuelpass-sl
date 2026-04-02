// server.js – FuelPass SL Express API server
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 4000;

// ---- Middleware ----
// ============ NATIONAL DEFENSIVE ARMOR (v=35K-FORTRESS-SYNC) ============

// 1. CORS: Permitting specific National Cross-Origin Auth
const corsOptions = {
  origin: true, // Allow Vercel & Dashboards
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};
app.use(cors(corsOptions));

// 2. Helmet: Hardened Header Defense (Tuned for Cross-Origin Authority)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // Managed by Vercel for the frontend
}));

app.use(express.json());

// 3. Dual-Limiter Shield Logic
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: { success: false, error: 'Too many login attempts, please try again later.' }
});

const managementLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, // Headroom for national admin tasks
  message: { success: false, error: 'Too many requests, please try again later.' }
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
