// ============================================================
// map.js – Leaflet map initialization and marker management
// ============================================================

let map = null;
let mapFilter = 'fuel';
let userMarker = null;
let allMarkers = [];

function initMap() {
  if (map) return;

  // Sri Lanka bounding box: SW(5.85, 79.50) → NE(9.95, 81.95)
  const sriLankaBounds = L.latLngBounds(
    L.latLng(5.85, 79.50),   // South-West corner
    L.latLng(9.95, 81.95)    // North-East corner
  );

  map = L.map('mainMap', {
    center: [7.8731, 80.7718], // Center of Sri Lanka
    zoom: 7,
    minZoom: 7,                // Can't zoom out past full-island view
    maxZoom: 17,
    maxBounds: sriLankaBounds, // Pan is locked to Sri Lanka
    maxBoundsViscosity: 1.0,   // Hard boundary – no elastic scrolling outside
    zoomControl: true,
    attributionControl: false
  });

  // CartoDB Voyager – readable dark navy style with city labels
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap © CARTO'
  }).addTo(map);

  // Fit to Sri Lanka on load
  map.fitBounds(sriLankaBounds, { padding: [20, 20] });

  renderMapMarkers();
}

function getMarkerColor(status) {
  const colors = { available: '#10B981', limited: '#F59E0B', out: '#EF4444' };
  return colors[status] || '#64748B';
}

function createStationIcon(status, isGas = false) {
  const color = isGas ? '#7C3AED' : getMarkerColor(status);
  const emoji = isGas ? '🔥' : '⛽';
  const html = `
    <div style="
      background: ${color};
      width: 36px; height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255,255,255,0.8);
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    ">
      <span style="transform: rotate(45deg); font-size: 14px;">${emoji}</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
}

function renderMapMarkers() {
  // Clear existing
  allMarkers.forEach(m => map.removeLayer(m));
  allMarkers = [];

  const showFuel = mapFilter === 'fuel' || mapFilter === 'all';
  const showGas  = mapFilter === 'gas'  || mapFilter === 'all';

  if (showFuel) {
    DB.stations.forEach(station => {
      const status = getStationOverallStatus(station);
      const icon = createStationIcon(status, false);
      const marker = L.marker([station.lat, station.lng], { icon })
        .addTo(map)
        .bindPopup(buildStationPopup(station), { maxWidth: 260 });
      marker.on('click', () => openStationModal(station));
      allMarkers.push(marker);
    });
  }

  if (showGas) {
    DB.gasShops.forEach(shop => {
      const status = getGasShopOverallStatus(shop);
      const icon = createStationIcon(status, true);
      const marker = L.marker([shop.lat, shop.lng], { icon })
        .addTo(map)
        .bindPopup(buildGasPopup(shop), { maxWidth: 240 });
      allMarkers.push(marker);
    });
  }
}

function buildStationPopup(station) {
  const status = getStationOverallStatus(station);
  const statusClass = status === 'available' ? 'popup-avail' : status === 'limited' ? 'popup-limited' : 'popup-out';
  const statusLabel = status === 'available' ? '✅ Available' : status === 'limited' ? '⚠️ Limited' : '❌ Out of Stock';

  // Get real prices from DB
  const priceSource = station.company === 'IOC' ? DB.fuelPrices.ioc : DB.fuelPrices.cpc;
  const realPrices = {
    petrol92:    priceSource.find(f => f.type.includes('92'))?.price || 398,
    petrol95:    priceSource.find(f => f.type.includes('95'))?.price || 455,
    diesel:      priceSource.find(f => f.type === 'Auto Diesel')?.price || 382,
    superDiesel: priceSource.find(f => f.type.includes('Super') || f.type.includes('XP Super'))?.price || 443,
  };

  const fuelsHtml = Object.entries(station.fuels)
    .map(([k, v]) => {
      const label = { petrol92:'P92', petrol95:'P95', diesel:'Diesel', superDiesel:'S.Diesel' }[k] || k;
      const dot = v==='available'?'🟢':v==='limited'?'🟡':'🔴';
      const price = realPrices[k] ? ` <em style="color:#94A3B8;font-size:0.7rem;">LKR ${realPrices[k]}</em>` : '';
      return `<span style="font-size:0.75rem;margin-right:6px;">${dot} ${label}${price}</span>`;
    }).join('');
  return `
    <div class="popup-card">
      <h4><strong>${station.name}</strong></h4>
      <p>📍 ${station.district} &bull; ${station.company}</p>
      <div style="margin:6px 0">${fuelsHtml}</div>
      <div style="margin-bottom:4px">
        <span class="popup-status ${statusClass}">${statusLabel}</span>
      </div>
      <p style="font-size:0.7rem;color:#888;">Queue: ${station.queue} &bull; Updated: ${station.lastUpdated}</p>
      <button onclick="openStationModal(DB.stations.find(s=>s.id==='${station.id}'))"
        style="margin-top:8px;width:100%;padding:6px;background:#3B82F6;color:white;border:none;border-radius:6px;font-size:0.8rem;cursor:pointer;">
        View Details
      </button>
    </div>
  `;
}

function buildGasPopup(shop) {
  const status = getGasShopOverallStatus(shop);
  const statusClass = status==='available'?'popup-avail':status==='limited'?'popup-limited':'popup-out';
  const statusLabel = status==='available'?'✅ Available':status==='limited'?'⚠️ Limited':'❌ Out of Stock';

  // Get real gas prices from DB
  const priceSource = shop.provider === 'LAUGFS' ? DB.gasPrices.laugfs : DB.gasPrices.litro;

  const stockHtml = Object.entries(shop.stock || {})
    .map(([size, v]) => {
      const dot   = v==='available'?'🟢':v==='limited'?'🟡':'🔴';
      const price = priceSource?.find(p => p.size === size)?.price;
      const priceText = price ? ` <em style="color:#94A3B8;font-size:0.7rem;">LKR ${price.toLocaleString()}</em>` : '';
      return `<span style="font-size:0.75rem;margin-right:8px;">${dot} ${size}${priceText}</span>`;
    }).join('');

  return `
    <div class="popup-card">
      <h4><strong>${shop.name}</strong></h4>
      <p>📍 ${shop.district} &bull; ${shop.provider}</p>
      <div style="margin:6px 0;">${stockHtml || '<span style="font-size:0.75rem;color:#888;">Stock unknown</span>'}</div>
      <span class="popup-status ${statusClass}">${statusLabel}</span>
      <p style="font-size:0.7rem;color:#888;margin-top:6px;">🚚 Last delivery: ${shop.lastDelivery || '--'}</p>
      <p style="font-size:0.7rem;color:#888;">📞 ${shop.phone || '--'}</p>
      <button onclick="openGasShopModal(DB.gasShops.find(g=>g.id==='${shop.id}'))"
        style="margin-top:8px;width:100%;padding:6px;background:#7C3AED;color:white;border:none;border-radius:6px;font-size:0.8rem;cursor:pointer;">
        🔥 View Details
      </button>
    </div>
  `;
}

// ---- GAS SHOP DETAIL MODAL ----
function openGasShopModal(shop) {
  if (!shop) return;
  const status = getGasShopOverallStatus(shop);
  const sc = status==='available'?'status-available':status==='limited'?'status-limited':'status-out';
  const sl = status.charAt(0).toUpperCase() + status.slice(1);

  // Get real prices from DB
  const priceSource = shop.provider === 'LAUGFS' ? DB.gasPrices.laugfs : DB.gasPrices.litro;

  const stockItems = Object.entries(shop.stock || {}).map(([size, v]) => {
    const chipC  = v==='available'?'chip-available':v==='limited'?'chip-limited':'chip-out';
    const stLabel = v==='available'?'✅ Available':v==='limited'?'⚠️ Limited':'❌ Out of Stock';
    const price  = priceSource?.find(p => p.size === size)?.price;
    return `
      <div class="mf-item">
        <h5>🫙 ${size} Cylinder</h5>
        <div class="mf-price">LKR ${price ? price.toLocaleString() : '—'}</div>
        <div class="fuel-chip ${chipC}" style="display:inline-flex"><span class="chip-dot"></span>${stLabel}</div>
      </div>
    `;
  }).join('');

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-station-name">🔥 ${shop.name}</div>
    <div class="modal-info-row">
      <span>📍 ${shop.address}</span>
      <span>•</span>
      <span>${shop.provider}</span>
      <span>•</span>
      <span class="oc-status ${sc}">${sl}</span>
    </div>
    <div class="modal-fuels-grid">${stockItems || '<p style="color:var(--text-muted)">Stock info not available</p>'}</div>
    <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.82rem;color:var(--text-secondary);margin-bottom:20px;">
      <span>📞 ${shop.phone || '--'}</span>
      <span>🚚 Last Delivery: ${shop.lastDelivery || '--'}</span>
      <span>📅 Next Delivery: ${shop.nextDelivery || '--'}</span>
    </div>
    <div class="modal-actions">
      <button class="btn-directions" onclick="openDirections(${shop.lat},${shop.lng})">🗺️ Get Directions</button>
      <button class="btn-report-this" onclick="closeModal();navigateTo('report')">📝 Report Status</button>
    </div>
  `;
  document.getElementById('stationModal').classList.remove('hidden');
}


function setMapFilter(filter) {
  mapFilter = filter;
  ['mcFuel','mcGas','mcAll'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  const mapping = { fuel:'mcFuel', gas:'mcGas', all:'mcAll' };
  document.getElementById(mapping[filter])?.classList.add('active');
  renderMapMarkers();
}

function locateUser() {
  if (!navigator.geolocation) {
    showToast('Geolocation not supported by your browser.', 'error');
    return;
  }
  showToast('Locating you...', 'info');
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.circleMarker([lat, lng], {
        radius: 10,
        fillColor: '#3B82F6',
        fillOpacity: 0.9,
        color: 'white',
        weight: 3
      }).addTo(map).bindPopup('📍 You are here').openPopup();
      map.setView([lat, lng], 13);
      showToast('Location found!', 'success');
    },
    err => {
      // Default to Sri Lanka center if denied
      map.setView([6.9271, 79.8612], 11);
      showToast('Using default: Colombo', 'info');
    }
  );
}
