// ============================================================
// nearest.js – Find Nearest Fuel/Gas Station using Geolocation
// ============================================================

let userLat = null;
let userLng = null;
let nearestList = [];

// Haversine formula – returns distance in km
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Find and show nearest stations
function findNearestStations(type = 'fuel') {
  const btn = document.getElementById('nearestBtn');
  if (btn) { btn.textContent = '📡 Locating...'; btn.disabled = true; }

  if (!navigator.geolocation) {
    showNearestError('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      renderNearestResults(type);
      if (btn) { btn.textContent = '📍 Find Nearest'; btn.disabled = false; }
    },
    err => {
      showNearestError('Could not get your location. Please allow location access.');
      if (btn) { btn.textContent = '📍 Find Nearest'; btn.disabled = false; }
    },
    { timeout: 10000 }
  );
}

function renderNearestResults(type = 'fuel') {
  const container = document.getElementById('nearestResults');
  if (!container) return;

  const dataset = type === 'gas' ? DB.gasShops : DB.stations;

  nearestList = dataset
    .map(item => ({
      ...item,
      distanceKm: haversineKm(userLat, userLng, item.lat, item.lng)
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 8); // top 8 nearest

  if (nearestList.length === 0) {
    container.innerHTML = `<p style="color:var(--text-secondary);text-align:center;">No stations found.</p>`;
    return;
  }

  container.innerHTML = nearestList.map((item, i) => {
    const isGas = type === 'gas';
    const status = isGas ? getGasShopOverallStatus(item) : getStationOverallStatus(item);
    const statusColor = status==='available'?'#10B981':status==='limited'?'#F59E0B':'#EF4444';
    const statusLabel = status==='available'?'✅ Available':status==='limited'?'⚠️ Limited':'❌ Out';
    const dist = item.distanceKm < 1
      ? `${Math.round(item.distanceKm * 1000)} m`
      : `${item.distanceKm.toFixed(1)} km`;
    const badge = i === 0 ? `<span style="background:#3B82F6;color:white;font-size:0.65rem;padding:2px 7px;border-radius:20px;margin-left:6px;">NEAREST</span>` : '';
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;

    return `
    <div class="nearest-card" style="
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      transition: background 0.2s;
    " onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'">
      <div style="
        min-width: 42px; height: 42px;
        background: ${statusColor}22;
        border: 2px solid ${statusColor};
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.2rem;
      ">${isGas ? '🔥' : '⛽'}</div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:0.9rem;color:var(--text-primary);">
          ${item.name} ${badge}
        </div>
        <div style="font-size:0.78rem;color:var(--text-secondary);margin:3px 0;">
          📍 ${item.address}
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:6px;flex-wrap:wrap;">
          <span style="font-size:0.75rem;color:${statusColor};font-weight:600;">${statusLabel}</span>
          <span style="font-size:0.75rem;color:#60A5FA;font-weight:700;">🗺️ ${dist} away</span>
          <span style="font-size:0.75rem;color:var(--text-secondary);">${isGas ? item.provider : item.company} • ${item.district}</span>
        </div>
      </div>
      <a href="${mapsUrl}" target="_blank" style="
        display: flex; align-items: center; gap: 5px;
        background: #10B981; color: white;
        font-size: 0.72rem; font-weight: 700;
        padding: 7px 11px; border-radius: 8px;
        text-decoration: none; white-space: nowrap;
        transition: opacity 0.2s;
      " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
        🧭 Directions
      </a>
    </div>`;
  }).join('');

  // Also pan map to user location
  if (map && userLat && userLng) {
    if (userMarker) map.removeLayer(userMarker);
    userMarker = L.circleMarker([userLat, userLng], {
      radius: 10,
      fillColor: '#3B82F6',
      fillOpacity: 0.9,
      color: 'white',
      weight: 3
    }).addTo(map).bindPopup('📍 You are here').openPopup();
    map.setView([userLat, userLng], 13);
  }
}

function showNearestError(msg) {
  const container = document.getElementById('nearestResults');
  if (container) container.innerHTML = `
    <div style="text-align:center;padding:20px;color:#EF4444;font-size:0.85rem;">
      ⚠️ ${msg}
    </div>`;
}

// Open Google Maps directions to a station
function openDirections(lat, lng) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}
