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

// ---- Core fetch wrapper with Cache-Busting ----
async function apiFetch(path, options = {}) {
  try {
    const url = new URL(`${API_BASE}${path}`);
    // Append timestamp to GET requests to bypass CDN/Browser cache
    if (!options.method || options.method === 'GET') {
      url.searchParams.set('_t', Date.now());
    }

    const res = await fetch(url.toString(), {
      headers: Auth.getHeaders(),
      cache: 'no-store',
      ...options,
    });

    // National Self-Healing Fix (v=34K-TOKEN-RECOVERY)
    if (res.status === 401 || res.status === 403) {
      console.warn('⚠️ Session expired or invalid. Redirecting to login...');
      Auth.clearToken();
      if (window.location.pathname.includes('admin.html')) {
        window.location.href = 'admin.html#login-refresh';
        location.reload();
      }
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API error');
    return data;
  } catch (err) {
    console.warn(`API call failed [${path}]:`, err.message);
    return { success: false, error: err.message };
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

async function apiDeleteReport(id) {
  return apiFetch(`/api/reports/${id}`, { method: 'DELETE' });
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

// --- OWNER ACTIONS ---
async function apiOwnerUpdateStation(stationId, payload) {
  return apiFetch(`/api/stations/${stationId}/status`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function apiOwnerUpdateGas(shopId, payload) {
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

// ---- Admin Functions ----
async function apiGetOwners() {
  return apiFetch('/api/owners');
}
async function apiAddOwner(payload) {
  return apiFetch('/api/owners', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
async function apiDeleteOwner(id) {
  return apiFetch(`/api/owners/${id}`, { method: 'DELETE' });
}

// ---- Contact/Feedback ----
async function apiSubmitContact(payload) {
  return apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
async function apiGetContactMessages() {
  return apiFetch('/api/contact');
}
async function apiReplyContact(id, reply) {
  return apiFetch(`/api/contact/${id}/reply`, {
    method: 'PATCH',
    body: JSON.stringify({ reply }),
  });
}
async function apiDeleteContact(id) {
  return apiFetch(`/api/contact/${id}`, { method: 'DELETE' });
}

async function apiUpdateStationStatus(id, payload, isGas = false) {
  const ep = isGas ? `/api/gas-shops/${id}/status` : `/api/stations/${id}/status`;
  return apiFetch(ep, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

async function apiDeleteStation(id) {
  return apiFetch(`/api/stations/${id}`, { method: 'DELETE' });
}

async function apiVerifyReport(id) {
  return apiFetch(`/api/reports/${id}/verify`, { method: 'PATCH' });
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

  // ---- STATIONS: Merge live DB entries ON TOP of static real data ----
  // Always start with the full static list (69 real Sri Lanka stations)
  try { loadRealStationData(); } catch(e) {}

  if (stationsResp?.data?.length) {
    const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    
    stationsResp.data.forEach(live => {
      const isGas = (live.id || '').startsWith('rg');
      const liveNameNorm = normalize(live.name);
      
      if (isGas) {
        // Handle Gas Shop merge from stations endpoint
        const idx = DB.gasShops.findIndex(g => g.id === live.id || normalize(g.name) === liveNameNorm);
        if (idx !== -1) {
          const existing = DB.gasShops[idx];
          // Map backend 'fuels' to frontend 'stock' if fuels exists (happens when editing gas as a station)
          const liveStock = live.stock || live.fuels || {};
          DB.gasShops[idx] = { 
            ...existing, 
            ...live, 
            stock: { ...(existing.stock || {}), ...liveStock },
            id: existing.id || live.id,
            lastUpdated: 'Live updated'
          };
        }
      } else {
        // Handle Fuel Station merge
        const mapped = {
          ...live,
          fuels: live.fuels || { petrol92:'available', petrol95:'available', diesel:'available', superDiesel:'available' },
          queue: Object.values(live.queues || {})[0] || 'none',
          lastUpdated: live.last_updated ? new Date(live.last_updated).toLocaleTimeString() : '--',
        };
        const liveAddrNorm = normalize(live.address);
        const idx = DB.stations.findIndex(s => 
          s.id === live.id || 
          (normalize(s.name) === liveNameNorm && normalize(s.address).startsWith(liveAddrNorm.substring(0, 10))) ||
          (normalize(s.name) === liveNameNorm)
        );
        if (idx !== -1) {
          const existing = DB.stations[idx];
          DB.stations[idx] = { ...existing, ...mapped, id: existing.id }; 
        } else {
          DB.stations.push(mapped); 
        }
      }
    });
    console.log(`✅ Live data merged: Total ${DB.stations.length} stations, ${DB.gasShops.length} gas shops.`);
  }

  if (gasResp?.data?.length) {
    const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    gasResp.data.forEach(live => {
      const liveNameNorm = normalize(live.name);
      const idx = DB.gasShops.findIndex(g => g.id === live.id || normalize(g.name) === liveNameNorm);
      if (idx !== -1) {
        const existing = DB.gasShops[idx];
        DB.gasShops[idx] = { 
          ...existing, 
          ...live, 
          stock: { ...(existing.stock || {}), ...(live.stock || {}) },
          lastUpdated: 'Live updated'
        };
      } else {
        DB.gasShops.push({ ...live, stock: live.stock || {} });
      }
    });
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

  // ---- DYNAMIC STATISTICAL SYNC (v=47K-USG-DISCOVER) ----
  // Counting all stations (fuel/gas) but excluding community "new" requests not yet verified
  // If id is numeric (live) or starts with 'r' (static real), it's a valid station
  const isReal = s => typeof s.id === 'number' || s.id.startsWith('r');
  
  const fuelCount = DB.stations.filter(s => isReal(s)).length;
  const gasCount  = DB.gasShops.filter(g => isReal(g)).length;
  
  DB.stats.totalStations = fuelCount; 
  DB.stats.totalGasShops = gasCount;
  
  const availFuel = DB.stations.filter(s => isReal(s) && Object.values(s.fuels || {}).some(v => v === 'available')).length;
  const availGas  = DB.gasShops.filter(g => isReal(g) && Object.values(g.stock || {}).some(v => v === 'available')).length;
  
  DB.stats.availableStations = availFuel + availGas;
  DB.stats.lastUpdated = 'Just now';
  console.log(`📡 National Stats Updated: ${DB.stats.availableStations} / ${DB.stats.totalStations + DB.stats.totalGasShops} Available`);
}


function timeAgo(dateStr) {
  if (!dateStr) return '--';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1)  return 'Just now';
  if (diff < 60) return `${diff} min ago`;
  return `${Math.floor(diff / 60)} hr ago`;
}
