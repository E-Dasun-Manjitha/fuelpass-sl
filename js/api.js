// ============================================================
// api.js – Central API client for FuelPass SL
// Replaces DB.* static data with live backend calls
// ============================================================

// ---- Set your Render backend URL here ----
// In production this is your Render URL; in dev it's localhost:4000
const API_BASE = window.FUELPASS_API_URL || 'https://fuelpass-sl-api.onrender.com';

// ---- Auth token helpers ----
const Auth = {
  getToken:    ()    => localStorage.getItem('fp_token'),
  setToken:    (t)   => localStorage.setItem('fp_token', t),
  clearToken:  ()    => localStorage.removeItem('fp_token'),
  getHeaders:  ()    => ({
    'Content-Type': 'application/json',
    ...(Auth.getToken() ? { 'Authorization': `Bearer ${Auth.getToken()}` } : {})
  }),
};

// ---- Core fetch wrapper ----
async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: Auth.getHeaders(),
      ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API error');
    return data;
  } catch (err) {
    console.warn(`API call failed [${path}]:`, err.message);
    return null;
  }
}

// ============================================================
// PUBLIC API FUNCTIONS
// ============================================================

async function apiGetStations(filters = {}) {
  const q = new URLSearchParams(filters).toString();
  return apiFetch(`/api/stations${q ? '?' + q : ''}`);
}

async function apiGetGasShops(filters = {}) {
  const q = new URLSearchParams(filters).toString();
  return apiFetch(`/api/gas-shops${q ? '?' + q : ''}`);
}

async function apiGetPrices() {
  return apiFetch('/api/prices');
}

async function apiGetReports(verified) {
  const q = verified !== undefined ? `?verified=${verified}` : '';
  return apiFetch(`/api/reports${q}`);
}

async function apiSubmitReport(payload) {
  return apiFetch('/api/reports', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function apiSubmitVerifiedReport(payload) {
  return apiFetch('/api/reports/verified', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function apiUpdateStationStatus(stationId, payload) {
  return apiFetch(`/api/stations/${stationId}/status`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function apiUpdateGasStockStatus(shopId, payload) {
  return apiFetch(`/api/gas-shops/${shopId}/stock`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function apiOwnerLogin(station_code, password) {
  return apiFetch('/api/auth/owner-login', {
    method: 'POST',
    body: JSON.stringify({ station_code, password }),
  });
}

async function apiAdminLogin(password) {
  return apiFetch('/api/auth/admin-login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

// ============================================================
// BOOTSTRAP – Load live data into DB on page start
// Falls back to static data if API is unreachable
// ============================================================
async function loadLiveData() {
  console.log('🔄 Loading live data from API...');

  const [stationsResp, gasResp, pricesResp, reportsResp] = await Promise.all([
    apiGetStations(),
    apiGetGasShops(),
    apiGetPrices(),
    apiGetReports(),
  ]);

  if (stationsResp?.data?.length) {
    // Normalise API response to match existing DB shape
    DB.stations = stationsResp.data.map(s => ({
      ...s,
      fuels: s.fuels || { petrol92:'available', petrol95:'available', diesel:'available', superDiesel:'available' },
      queue: Object.values(s.queues || {})[0] || 'none',
      lastUpdated: s.last_updated ? new Date(s.last_updated).toLocaleTimeString() : '--',
    }));
    console.log(`✅ ${DB.stations.length} stations loaded from API`);
  } else {
    console.warn('⚠️ Using static fallback station data');
    try { loadRealStationData(); } catch(e) {}
  }

  if (gasResp?.data?.length) {
    DB.gasShops = gasResp.data.map(g => ({
      ...g,
      stock: g.stock || {},
      lastDelivery: g.last_delivery || '--',
      nextDelivery: g.next_delivery || '--',
    }));
    console.log(`✅ ${DB.gasShops.length} gas shops loaded from API`);
  }

  if (pricesResp?.data) {
    const p = pricesResp.data;
    // Map DB column names to app format
    const mapPrice = r => ({ type: r.fuel_type, price: r.price, prevPrice: r.prev_price, unit: r.unit });
    const mapGas   = r => ({ size: r.size, price: r.price, status: r.status });
    DB.fuelPrices.cpc    = (p.fuelPrices?.cpc    || []).map(mapPrice);
    DB.fuelPrices.ioc    = (p.fuelPrices?.ioc    || []).map(mapPrice);
    DB.gasPrices.litro   = (p.gasPrices?.litro   || []).map(mapGas);
    DB.gasPrices.laugfs  = (p.gasPrices?.laugfs  || []).map(mapGas);
    console.log('✅ Live prices loaded from API');
  }

  if (reportsResp?.data?.length) {
    DB.recentReports = reportsResp.data.map(r => ({
      station: r.station_name,
      product: r.product,
      status:  r.status,
      queue:   r.queue,
      time:    timeAgo(r.created_at),
      verified:r.verified,
      user:    r.reporter,
    }));
  }

  // Recompute stats
  DB.stats.totalStations     = DB.stations.length;
  DB.stats.totalGasShops     = DB.gasShops.length;
  DB.stats.availableStations = DB.stations.filter(s =>
    Object.values(s.fuels || {}).some(v => v === 'available')
  ).length;
  DB.stats.lastUpdated = 'Just now';
}

function timeAgo(dateStr) {
  if (!dateStr) return '--';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1)  return 'Just now';
  if (diff < 60) return `${diff} min ago`;
  return `${Math.floor(diff / 60)} hr ago`;
}
