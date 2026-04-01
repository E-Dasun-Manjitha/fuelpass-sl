// ============================================================
// nearest.js – Find Nearest Fuel/Gas Station using Geolocation
// ============================================================

let userLat = null;
let userLng = null;
let nearestList = [];

/**
 * Haversine formula – returns distance in km
 */
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/**
 * Find and show nearest stations
 * @param {string} type - 'fuel' or 'gas'
 */
function findNearestStations(type = 'fuel') {
  const btn = type === 'gas' ? document.getElementById('nearestGasBtn') : document.getElementById('nearestBtn');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) { btn.innerHTML = '📡 Locating...'; btn.disabled = true; }

  if (!navigator.geolocation) {
    showNearestError('Geolocation is not supported by your browser.');
    if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      renderNearestResults(type);
      if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
    },
    err => {
      showNearestError('Could not get your location. Please allow location access.');
      if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
    },
    { timeout: 10000 }
  );
}

/**
 * Render results with Swap & Refresh controls
 */
function renderNearestResults(type = 'fuel') {
  const container = document.getElementById('nearestResults');
  const clearBtn = document.getElementById('clearNearestBtn');
  if (!container) return;

  // Show "Clear" button now that we have custom results
  if (clearBtn) clearBtn.style.display = 'block';

  const dataset = type === 'gas' ? (DB.gasShops || []) : (DB.stations || []);

  nearestList = dataset
    .map(item => ({
      ...item,
      distanceKm: haversineKm(userLat, userLng, item.lat, item.lng)
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 8); 

  if (nearestList.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:20px;">
        <p style="color:var(--text-secondary);margin-bottom:12px;">No ${type === 'gas' ? 'gas shops' : 'fuel stations'} found nearby.</p>
        <button class="mc-btn" onclick="renderNearestResults('${type === 'gas' ? 'fuel' : 'gas'}')">🔄 Try checking for ${type === 'gas' ? 'Fuel' : 'Gas'} instead</button>
      </div>`;
    return;
  }

  // Header Actions: Swap & Refresh
  const headerHtml = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding:4px 0 12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
       <div style="font-size:0.7rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Nearest ${type === 'gas' ? 'Gas Dealers' : 'Fuel Stations'}</div>
       <div style="display:flex;gap:8px;">
          <button class="mc-btn" style="padding:6px 10px;font-size:0.7rem;background:rgba(124,58,237,0.15);color:#A78BFA;border:1px solid rgba(124,58,237,0.2);" onclick="renderNearestResults('${type === 'gas' ? 'fuel' : 'gas'}')">
             🔀 Switch
          </button>
          <button class="mc-btn" style="padding:6px 10px;font-size:0.7rem;" onclick="findNearestStations('${type}')">
             🔄 Refresh
          </button>
       </div>
    </div>
  `;

  const cardsHtml = nearestList.map((item, i) => {
    const isGas = type === 'gas';
    const status = isGas ? getGasShopOverallStatus(item) : getStationOverallStatus(item);
    const statusColor = status==='available'?'#10B981':status==='limited'?'#F59E0B':'#EF4444';
    const statusLabel = status==='available'?'✅ Available':status==='limited'?'⚠️ Limited':'❌ Out';
    const dist = item.distanceKm < 1
      ? `${Math.round(item.distanceKm * 1000)} m`
      : `${item.distanceKm.toFixed(1)} km`;
    const badge = i === 0 ? `<span style="background:#3B82F6;color:white;font-size:0.65rem;padding:2px 7px;border-radius:20px;margin-left:6px;">CLOSEST</span>` : '';
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
    
    // MODAL CALL LOGIC
    const modalCall = isGas 
      ? `openGasShopModal(DB.gasShops.find(g=>g.id==='${item.id}'))` 
      : `openStationModal(DB.stations.find(s=>s.id==='${item.id}'))`;

    return `
    <div class="nearest-card" onclick="${modalCall}" style="
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px;
      padding: 14px 16px;
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      transition: all 0.2s;
      cursor: pointer;
    " onmouseover="this.style.background='rgba(255,255,255,0.07)';this.style.borderColor='rgba(16,185,129,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='rgba(255,255,255,0.06)'">
      <div style="
        min-width: 42px; height: 42px;
        background: ${statusColor}15;
        border: 1.5px solid ${statusColor};
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.1rem;
      ">${isGas ? '🔥' : '⛽'}</div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:0.88rem;color:var(--text-primary);">
          ${item.name} ${badge}
        </div>
        <div style="font-size:0.75rem;color:var(--text-secondary);margin:3px 0;line-height:1.3;">
          📍 ${item.address}
        </div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;flex-wrap:wrap;">
          <span style="font-size:0.75rem;color:${statusColor};font-weight:700;">${statusLabel}</span>
          <span style="font-size:0.75rem;color:#60A5FA;font-weight:700;">🗺️ ${dist}</span>
          <span style="font-size:0.72rem;color:var(--text-muted);">${isGas ? (item.provider || 'Gas') : (item.company || 'Fuel')} • ${item.district}</span>
        </div>
      </div>
      <a href="${mapsUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="
        display: flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg,#10B981,#059669); color: white;
        font-size: 0.7rem; font-weight: 700;
        padding: 7px 12px; border-radius: 8px;
        text-decoration: none; white-space: nowrap;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(16,185,129,0.3);
      " onmouseover="this.style.transform='scale(1.05)';this.style.boxShadow='0 4px 16px rgba(16,185,129,0.5)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 2px 8px rgba(16,185,129,0.3)'">
        🧭 Navigate
      </a>
    </div>`;
  }).join('');

  container.innerHTML = headerHtml + cardsHtml;

  // Sync Map
  if (typeof map !== 'undefined' && map && userLat && userLng) {
    if (typeof userMarker !== 'undefined' && userMarker) map.removeLayer(userMarker);
    userMarker = L.circleMarker([userLat, userLng], {
      radius: 9,
      fillColor: '#3B82F6',
      fillOpacity: 0.8,
      color: 'white',
      weight: 2
    }).addTo(map).bindPopup('📍 You are here').openPopup();
    map.setView([userLat, userLng], 14);
  }
}

/**
 * Clear search results and reset view
 */
function clearNearestResults() {
  const container = document.getElementById('nearestResults');
  const clearBtn = document.getElementById('clearNearestBtn');
  if (container) container.innerHTML = '';
  if (clearBtn) clearBtn.style.display = 'none';
  if (typeof map !== 'undefined' && map) {
    if (typeof userMarker !== 'undefined' && userMarker) map.removeLayer(userMarker);
    map.setView([7.8731, 80.7718], 8); // Back to Sri Lanka view
  }
}

function showNearestError(msg) {
  const container = document.getElementById('nearestResults');
  if (container) container.innerHTML = `
    <div style="text-align:center;padding:20px;color:#EF4444;font-size:0.8rem;background:rgba(239,68,68,0.05);border-radius:12px;border:1px solid rgba(239,68,68,0.1);">
      ⚠️ ${msg}
    </div>`;
}

function openDirections(lat, lng) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}
