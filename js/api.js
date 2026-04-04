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
      cache: 'no-store',
      ...options,
    });

    // National Self-Healing Fix (v=34K-TOKEN-RECOVERY)
    if (res.status === 401 || res.status === 403) {
      console.warn('⚠️ Session expired or invalid. Redirecting to login...');
      Auth.clearToken();
      // Handle Admin-Panel vs Dashboard Login Portal
      if (window.location.pathname.includes('admin.html')) {
        window.location.href = 'admin.html#login-refresh';
        location.reload(); // Force refresh to trigger login state
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
    // Normalise API response to match existing DB shape
    // FILTER: Only merge real fuel stations into DB.stations (id starts with r, not rg)
    const liveStations = stationsResp.data
      .filter(s => !(s.id || '').startsWith('rg')) // allow 'r' and custom company IDs like 'cpcgal'
      .map(s => ({
        ...s,
        fuels: s.fuels || { petrol92:'available', petrol95:'available', diesel:'available', superDiesel:'available' },
        queue: Object.values(s.queues || {})[0] || 'none',
        lastUpdated: s.last_updated ? new Date(s.last_updated).toLocaleTimeString() : '--',
      }));

    // Merge: upsert live stations into the static list (by id)
    const existingIds = new Set(DB.stations.map(s => s.id));
    liveStations.forEach(live => {
      const idx = DB.stations.findIndex(s => s.id === live.id);
      if (idx !== -1) {
        DB.stations[idx] = live; // update existing
      } else {
        DB.stations.push(live);  // add new (admin-created)
      }
    });
    console.log(`✅ ${liveStations.length} live DB stations merged → total ${DB.stations.length} stations`);
  } else {
    console.warn('⚠️ API returned no stations — showing static data only');
  }


  if (gasResp?.data?.length) {
    const liveGas = gasResp.data.map(g => ({
      ...g,
      stock: g.stock || {},
      lastDelivery: g.last_delivery || '--',
      nextDelivery: g.next_delivery || '--',
    }));
    // Merge into static list
    liveGas.forEach(live => {
      const idx = DB.gasShops.findIndex(g => g.id === live.id);
      if (idx !== -1) {
        DB.gasShops[idx] = live;
      } else {
        DB.gasShops.push(live);
      }
    });
    console.log(`✅ ${liveGas.length} live DB gas shops merged → total ${DB.gasShops.length}`);
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
  // Expanding discovery for custom IDs like 'USG' (cpcgal)
  
  const fuelCount = DB.stations.filter(s => !s.id.startsWith('rg')).length;
  const gasCount  = DB.gasShops.filter(g => g.id.startsWith('rg')).length;
  
  DB.stats.totalStations = fuelCount; 
  DB.stats.totalGasShops = gasCount;
  
  const availFuel = DB.stations.filter(s => !s.id.startsWith('rg') && Object.values(s.fuels || {}).some(v => v === 'available')).length;
  const availGas  = DB.gasShops.filter(g => g.id.startsWith('rg') && Object.values(g.stock || {}).some(v => v === 'available')).length;
  
  DB.stats.availableStations = availFuel + availGas;
  DB.stats.lastUpdated = 'Just now';
  console.log(`📡 National Stats Updated: ${DB.stats.totalStations} Fuel | ${DB.stats.totalGasShops} Gas`);
}


function timeAgo(dateStr) {
  if (!dateStr) return '--';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1)  return 'Just now';
  if (diff < 60) return `${diff} min ago`;
  return `${Math.floor(diff / 60)} hr ago`;
}
