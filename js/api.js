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

async function apiUpdateStationStatus(id, payload, isGas = null) {
  // Auto-detect based on 'rg' prefix if isGas is not explicitly set to true/false
  const finalIsGas = (isGas !== null) ? isGas : (id && id.toString().startsWith('rg'));
  const ep = finalIsGas ? `/api/gas-shops/${id}/status` : `/api/stations/${id}/status`;
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

  // Normalize DB fuel keys → camelCase keys the UI expects
  const fuelKeyNorm = {
    'petrol92': 'petrol92', 'petrol 92': 'petrol92',
    'petrol95': 'petrol95', 'petrol 95': 'petrol95',
    'diesel': 'diesel', 'auto diesel': 'diesel', 'autodiesel': 'diesel',
    'superdiesel': 'superDiesel', 'super diesel': 'superDiesel',
    'superdiesel(euro4)': 'superDiesel', 'super diesel (euro 4)': 'superDiesel',
  };
  const normalizeFuels = (fuelsObj) => {
    if (!fuelsObj) return {};
    const result = {};
    Object.entries(fuelsObj).forEach(([k, v]) => {
      const canonical = fuelKeyNorm[k.toLowerCase()] || fuelKeyNorm[k.toLowerCase().replace(/\s+/g, '')] || k;
      result[canonical] = v;
    });
    return result;
  };

  if (stationsResp?.data?.length) {
    const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    
    stationsResp.data.forEach(live => {
      const liveId = String(live.id);
      const isGas = liveId.startsWith('rg') || live.is_gas;
      const liveNameNorm = normalize(live.name);
      
      if (isGas) {
        let idx = DB.gasShops.findIndex(g => String(g.id) === liveId);
        if (idx === -1) idx = DB.gasShops.findIndex(g => normalize(g.name) === liveNameNorm);
        
        const liveStock = live.stock || live.fuels || {};
        if (idx !== -1) {
          DB.gasShops[idx] = { 
            ...DB.gasShops[idx], 
            ...live, 
            stock: { ...(DB.gasShops[idx].stock || {}), ...liveStock },
            lastUpdated: 'Live updated'
          };
        } else {
          DB.gasShops.push({ ...live, stock: liveStock, lastUpdated: 'Live updated' });
        }
      } else {
        const normalizedFuels = normalizeFuels(live.fuels);
        const mapped = {
          ...live,
          fuels: Object.keys(normalizedFuels).length > 0
            ? normalizedFuels
            : { petrol92:'available', petrol95:'available', diesel:'available', superDiesel:'available' },
          queue: Object.values(live.queues || {})[0] || 'none',
          lastUpdated: live.last_updated ? new Date(live.last_updated).toLocaleTimeString() : 'Just now',
        };
        let idx = DB.stations.findIndex(s => String(s.id) === liveId);
        if (idx === -1) idx = DB.stations.findIndex(s => normalize(s.name) === liveNameNorm);

        if (idx !== -1) {
          DB.stations[idx] = { ...DB.stations[idx], ...mapped }; 
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
      // Normalize snake_case API keys → camelCase for consistency
      const mergedLive = {
        ...live,
        stock: live.stock || {},
        fuels: live.stock || {},  // alias so renderManageStations finds it
        lastDelivery: live.last_delivery || live.lastDelivery || '',
        nextDelivery: live.next_delivery || live.nextDelivery || '',
        lastUpdated: 'Live updated',
      };
      if (idx !== -1) {
        const existing = DB.gasShops[idx];
        DB.gasShops[idx] = { 
          ...existing, 
          ...mergedLive,
          stock: { ...(existing.stock || {}), ...(live.stock || {}) },
          fuels: { ...(existing.stock || {}), ...(live.stock || {}) },
        };
      } else {
        DB.gasShops.push(mergedLive);
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
