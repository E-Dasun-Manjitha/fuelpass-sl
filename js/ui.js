// ============================================================
// ui.js – Render all UI components (stations, prices, gas, reports)
// ============================================================

// ---- THEME SELECTOR ----
function initTheme() {
  const saved = localStorage.getItem('fp_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fp_theme', next);
  
  const modeLabel = next === 'dark' ? t('nav_theme_dark') : t('nav_theme_light');
  showToast(t('nav_theme_switched_to').replace('%mode%', modeLabel), 'info');
};

// Initialize theme immediately
initTheme();

// ---- MOBILE DRAWER (v=22K) ----
window.toggleDrawer = function() {
  const drawer  = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (!drawer || !overlay) return;
  
  drawer.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Prevent body scroll when menu is active
  if (drawer.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// ---- TICKER ----
function buildTicker() {
  const all = [
    ...DB.fuelPrices.cpc.map(f => ({ label: `CPC ${f.type}`, price: `LKR ${f.price.toLocaleString()}` })),
    ...DB.fuelPrices.ioc.map(f => ({ label: `IOC ${f.type}`, price: `LKR ${f.price.toLocaleString()}` })),
    { label: 'Litro LP Gas 12.5kg', price: `LKR ${DB.gasPrices.litro[0].price.toLocaleString()}` },
    { label: 'LAUGFS LP Gas 12.5kg', price: `LKR ${DB.gasPrices.laugfs[0].price.toLocaleString()}` },
  ];
  // Duplicate for seamless loop
  const items = [...all, ...all];
  const html = items.map(i => `
    <div class="ticker-item">
      <span>${i.label}</span>
      <span class="ticker-price">${i.price}</span>
      <span style="color:#334155;">|</span>
    </div>
  `).join('');
  document.getElementById('tickerItems').innerHTML = html;
}

// ---- OVERVIEW STATS ----
function updateStats() {
  document.getElementById('statStations').textContent = DB.stats.totalStations;
  document.getElementById('statAvail').textContent    = DB.stats.availableStations;
  document.getElementById('statGas').textContent      = DB.stats.totalGasShops;
  document.getElementById('statUpdated').textContent  = DB.stats.lastUpdated;

  // ---- Sync Overview Card prices from DB.fuelPrices (CPC) ----
  const cpc = DB.fuelPrices.cpc;
  const p92  = cpc.find(f => f.type.includes('92'));
  const dsl  = cpc.find(f => f.type === 'Auto Diesel');
  const gas  = DB.gasPrices.litro.find(g => g.size === '12.5 kg');
  const p95  = cpc.find(f => f.type.includes('95'));

  if (p92)  { const el = document.getElementById('ocPrice92');  if (el) el.textContent = `LKR ${p92.price.toLocaleString()}`; }
  if (dsl)  { const el = document.getElementById('ocPriceDsl'); if (el) el.textContent = `LKR ${dsl.price.toLocaleString()}`; }
  if (gas)  { const el = document.getElementById('ocPriceGas'); if (el) el.textContent = `LKR ${gas.price.toLocaleString()}`; }
  if (p95)  { const el = document.getElementById('ocPrice95');  if (el) el.textContent = `LKR ${p95.price.toLocaleString()}`; }
}

// ---- MINI SPARKLINE ----
function drawSparkline(canvasId, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const vals = Array.from({length: 8}, () => 0.3 + Math.random() * 0.7);
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const step = w / (vals.length - 1);
  ctx.beginPath();
  ctx.moveTo(0, h - vals[0] * h);
  vals.forEach((v, i) => ctx.lineTo(i * step, h - v * h));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  // Fill
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '60');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fill();
}

// ---- STATION CARD ----
function renderStationCard(station, clickFn) {
  const status = getStationOverallStatus(station);
  const statusClass = status === 'available' ? 'status-available' : status === 'limited' ? 'status-limited' : 'status-out';
  const badgeClass  = station.company === 'CPC' ? 'badge-cpc' : 'badge-ioc';

  const fuelsHtml = Object.entries(station.fuels).map(([k, v]) => {
    const labels = { petrol92: t('card_petrol92'), petrol95: t('card_petrol95'), diesel: t('card_diesel'), superDiesel: t('card_superDiesel') };
    const chipClass = v === 'available' ? 'chip-available' : v === 'limited' ? 'chip-limited' : 'chip-out';
    return `<div class="fuel-chip ${chipClass}"><span class="chip-dot"></span>${labels[k]||k}</div>`;
  }).join('');

  const queueLabel = station.queue === 'none' ? `✅ ${t('queue_none')}` : station.queue === 'short' ? `⏱️ ${t('queue_short')}` : station.queue === 'medium' ? `⚠️ ${t('queue_medium')}` : `🚗 ${t('queue_long')}`;

  let distanceHtml = '';
  if (typeof userLat !== 'undefined' && userLat !== null && userLng !== null) {
     const d = haversineKm(userLat, userLng, station.lat, station.lng);
     const distStr = d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`;
     distanceHtml = `<span style="color:#60A5FA;font-weight:700;margin-right:8px;">📍 ${distStr}</span>`;
  }

  return `
    <div class="station-card" onclick="${clickFn || `openStationModal(DB.stations.find(s=>s.id==='${station.id}'))`}" id="card-${station.id}">
      <div class="station-card-header">
        <div class="station-card-title">
          <h4>${station.name}</h4>
          <p>📍 ${station.address}</p>
        </div>
        <span class="station-badge ${badgeClass}">${station.company}</span>
      </div>
      <div class="station-fuels">${fuelsHtml}</div>
      <div class="station-card-footer">
        <span class="${statusClass} oc-status">${t('status_' + status)}</span>
        ${distanceHtml}
        <span>${queueLabel}</span>
        <span class="station-updated">🕐 ${station.lastUpdated}</span>
      </div>
    </div>
  `;
}

// ---- GAS SHOP CARD ----
function renderGasShopCard(shop) {
  const status = getGasShopOverallStatus(shop);
  const statusClass = status === 'available' ? 'status-available' : status === 'limited' ? 'status-limited' : 'status-out';
  const badgeClass = shop.provider === 'Litro' ? 'badge-litro' : shop.provider === 'LAUGFS' ? 'badge-laugfs' : 'badge-both';

  const stockHtml = Object.entries(shop.stock).map(([size, v]) => {
    const chipClass = v === 'available' ? 'chip-available' : v === 'limited' ? 'chip-limited' : 'chip-out';
    return `<div class="fuel-chip ${chipClass}"><span class="chip-dot"></span>${size}</div>`;
  }).join('');

  let distanceHtml = '';
  if (typeof userLat !== 'undefined' && userLat !== null && userLng !== null) {
     const d = haversineKm(userLat, userLng, shop.lat, shop.lng);
     const distStr = d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`;
     distanceHtml = `<span style="color:#60A5FA;font-weight:700;margin-right:8px;">📍 ${distStr}</span>`;
  }

  return `
    <div class="station-card" id="gcard-${shop.id}" onclick="openGasShopModal(DB.gasShops.find(g=>g.id==='${shop.id}'))">
      <div class="station-card-header">
        <div class="station-card-title">
          <h4>${shop.name}</h4>
          <p>📍 ${shop.address}</p>
        </div>
        <span class="gas-shop-badge ${badgeClass}">${shop.provider}</span>
      </div>
      <div class="station-fuels">${stockHtml}</div>
      <div class="station-card-footer">
        <span class="${statusClass} oc-status">${t('status_' + status)}</span>
        ${distanceHtml}
        <span>📦 ${shop.lastRestock || 'Typical Stock'}</span>
        <span>🚗 Queue: ${shop.queue || 'none'}</span>
        <span>🚚 LIVE: ${shop.nextDelivery || 'In 2 days'}</span>
      </div>
    </div>
  `;
}

// ---- GAS SHOP MODAL ----
window.openGasShopModal = function(shop) {
  if (!shop) return;
  const status = getGasShopOverallStatus(shop);
  const sc     = status==='available'?'status-available':status==='limited'?'status-limited':'status-out';
  const sl     = status.charAt(0).toUpperCase()+status.slice(1);

  const stockItems = Object.entries(shop.stock).map(([size, v]) => {
    const chipC   = v==='available'?'chip-available':v==='limited'?'chip-limited':'chip-out';
    const stLabel = t('status_' + v);
    
    // SURGICAL PRICE MATCH: Find price by normalizing size (removing spaces)
    const normalizedSize = size.toLowerCase().replace(/\s+/g, '');
    const priceData = DB.gasPrices[shop.provider.toLowerCase()]?.find(p => 
      p.size.toLowerCase().replace(/\s+/g, '') === normalizedSize
    );
    const price = priceData?.price || '—';

    return `
      <div class="mf-item">
        <h5>🫙 ${size.toUpperCase()} CYLINDER</h5>
        <div class="mf-price">LKR ${typeof price === 'number' ? price.toLocaleString() : price}</div>
        <div class="fuel-chip ${chipC}" style="display:inline-flex"><span class="chip-dot"></span>${stLabel}</div>
      </div>
    `;
  }).join('');

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-station-name">${shop.name}</div>
    <div class="modal-info-row">
      <span>📍 ${shop.address}</span>
      <span>•</span>
      <span>${shop.provider} Gas</span>
      <span>•</span>
      <span class="oc-status ${sc}">${sl}</span>
    </div>
    <div class="modal-fuels-grid">${stockItems}</div>
    <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.82rem;color:var(--text-secondary);margin-bottom:20px;">
      <span>📦 Last Restock: ${shop.lastRestock || 'Typically Stocked'}</span>
      <span>🚗 Queue: ${shop.queue || 'none'}</span>
      <span>🚚 Next Delivery: ${shop.nextDelivery || 'Typical Cycle'}</span>
      <span>🕐 ${t('last_updated')}: ${shop.lastUpdated || 'Just now'}</span>
    </div>
    <div class="modal-actions">
      <button class="btn-directions" onclick="openDirections(${shop.lat},${shop.lng})">🗺️ ${t('directions')}</button>
      <button class="btn-report-this" onclick="closeModal();navigateTo('report');setReportType('gas')">📝 ${t('report_update')}</button>
    </div>
  `;
  document.getElementById('stationModal').classList.remove('hidden');
}

// ---- FILTER & RENDER STATIONS LIST ----
let filteredStations = [...DB.stations];

function filterStations() {
  const district = document.getElementById('districtFilter')?.value || '';
  const fuel     = document.getElementById('fuelFilter')?.value || '';
  const company  = document.getElementById('companyFilter')?.value || '';

  filteredStations = DB.stations.filter(s => {
    const dOk = !district || s.district === district;
    const cOk = !company  || s.company  === company;
    const fOk = !fuel     || s.fuels[fuel] !== undefined;
    return dOk && cOk && fOk;
  });

  document.getElementById('stationsList').innerHTML =
    filteredStations.map(s => renderStationCard(s)).join('') ||
    `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px;">${t('no_stations_found')}</p>`;
}

// ============================================================
// AUTOCOMPLETE SUGGESTIONS
// ============================================================
const SRI_LANKA_DISTRICTS = [
  "Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya",
  "Galle","Matara","Hambantota","Jaffna","Kilinochchi","Mannar",
  "Vavuniya","Mullaitivu","Trincomalee","Batticaloa","Ampara",
  "Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla",
  "Monaragala","Ratnapura","Kegalle"
];

function getLevenshteinDistance(a, b) {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

window.showSuggestions = function(query, target) {
  const q = query.toLowerCase().trim();
  const container = document.getElementById(`${target}Suggestions`);
  if (!container) return;
  
  if (q.length < 2) {
    container.style.display = 'none';
    return;
  }

  let matches = [];

  // 1. Fuzzy match districts (tolerance: 1 typo for small words, 2 for larger)
  SRI_LANKA_DISTRICTS.forEach(d => {
    const dLower = d.toLowerCase();
    if (dLower === q || dLower.includes(q)) {
      matches.push({ type: 'District', icon: '📍', text: d, score: 0 });
    } else {
      const l = getLevenshteinDistance(q, dLower);
      if ((d.length <= 6 && l <= 1) || (d.length > 6 && l <= 2)) {
        matches.push({ type: 'District', icon: '📍', text: d, score: l });
      }
    }
  });

  // 2. Exact substring match for Stations & Gas
  let stCount = 0;
  DB.stations.forEach(s => {
    if (stCount < 5 && s.name && s.name.toLowerCase().includes(q)) {
      matches.push({ type: 'Fuel', icon: '⛽', text: s.name });
      stCount++;
    }
  });
  
  let gasCount = 0;
  DB.gasShops.forEach(s => {
    if (gasCount < 3 && s.name && s.name.toLowerCase().includes(q)) {
      matches.push({ type: 'Gas', icon: '🔥', text: s.name });
      gasCount++;
    }
  });

  // Sort: exact districts first, then fuzzy districts, then stations
  matches.sort((a,b) => {
    if (a.type === 'District' && b.type !== 'District') return -1;
    if (b.type === 'District' && a.type !== 'District') return 1;
    if (a.score !== undefined && b.score !== undefined) return a.score - b.score;
    return 0;
  });

  matches = matches.slice(0, 8); // Top 8 suggestions

  if (matches.length === 0) {
    container.innerHTML = `<div class="sugg-item" style="cursor:default;color:var(--text-muted); justify-content:center;">${t('no_suggestions') || 'No suggestions found.'}</div>`;
  } else {
    container.innerHTML = matches.map(m => `
      <div class="sugg-item" onmousedown="applySuggestion('${m.text.replace(/'/g, "\\'")}', '${target}')">
        <span class="sugg-icon">${m.icon}</span>
        <span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.text}</span>
        <span class="sugg-type">${m.type}</span>
      </div>
    `).join('');
  }
  container.style.display = 'block';
};

window.applySuggestion = function(val, target) {
  document.getElementById(`${target}Search`).value = val;
  document.getElementById(`${target}Suggestions`).style.display = 'none';
  if (target === 'hero') handleHeroSearch();
  if (target === 'stations') searchStations();
};

window.hideSuggestions = function(target) {
  const container = document.getElementById(`${target}Suggestions`);
  if (container) container.style.display = 'none';
};

function searchStations() {
  const query   = (document.getElementById('stationsSearch')?.value || '').trim().toLowerCase();
  const district= document.getElementById('sDistrictFilter')?.value || '';
  const status  = document.getElementById('sStatusFilter')?.value || '';
  const company = document.getElementById('sCompanyFilter')?.value || '';

  const results = DB.stations.filter(s => {
    const qOk = !query   || 
      (s.name && s.name.toLowerCase().includes(query)) || 
      (s.district && s.district.toLowerCase().includes(query)) || 
      (s.address && s.address.toLowerCase().includes(query));
    const dOk = !district || s.district === district;
    const cOk = !company  || s.company  === company;
    const sOk = !status   || getStationOverallStatus(s) === status;
    return qOk && dOk && cOk && sOk;
  });

  // Sort by distance if location available
  if (typeof userLat !== 'undefined' && userLat !== null && userLng !== null) {
    results.sort((a, b) => {
      const dA = haversineKm(userLat, userLng, a.lat, a.lng);
      const dB = haversineKm(userLat, userLng, b.lat, b.lng);
      return dA - dB;
    });
  }

  const countEl = document.getElementById('sResultsCount');
  if (countEl) countEl.textContent = `${results.length} station${results.length !== 1 ? 's' : ''} found`;

  document.getElementById('stationsPageList').innerHTML =
    results.map(s => renderStationCard(s, `openStationModal(DB.stations.find(st=>st.id==='${s.id}'))`)).join('') ||
    `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px;">${t('no_stations_found')}</p>`;
}

function handleHeroSearch() {
  const q = document.getElementById('heroSearch').value.trim();
  if (!q) return;

  const upper = q.toUpperCase();

  // 1. Detect Sri Lankan vehicle plate → go to Eligibility
  // Matches: ABC-1234 | AB-1234 | WP CAR 1234 | CAB 1234 etc.
  const platePattern = /^[A-Z]{2,3}[-\s]?\d{4}$|^[A-Z]{2}\s[A-Z]+\s\d{4}$|^[A-Z]{2,3}\s?\d{3,4}$/i;
  if (platePattern.test(upper.replace(/\s+/g,' ').trim())) {
    navigateTo('eligibility');
    setTimeout(() => {
      const inp = document.getElementById('qcPlate');
      if (inp) { inp.value = upper; }
      try { runCombinedCheck(); } catch(e) {}
    }, 200);
    return;
  }

  // 2. Gas-related terms → go to Gas page
  const gasTerms = ['gas','lpg','litro','laugfs','cylinder'];
  if (gasTerms.some(t => q.toLowerCase().includes(t))) {
    navigateTo('gas');
    setTimeout(() => {
      const sel = document.getElementById('gasDistrictFilter');
      // Try to match a district name in the query
      if (sel) {
        const districtMatch = Array.from(sel.options).find(o =>
          o.value && q.toLowerCase().includes(o.value.toLowerCase())
        );
        if (districtMatch) sel.value = districtMatch.value;
        filterGasShops();
      }
    }, 200);
    return;
  }

  // 3. Station / city / district search → go to Stations page
  // Use a 250ms delay so navigateTo's own searchStations() fires first,
  // then we override the input and re-run with the actual query.
  navigateTo('stations');
  setTimeout(() => {
    const inp = document.getElementById('stationsSearch');
    if (inp) { inp.value = q; }

    // Also try to pre-select the district filter if query matches a district
    const distSel = document.getElementById('sDistrictFilter');
    if (distSel) {
      const match = Array.from(distSel.options).find(o =>
        o.value && q.toLowerCase() === o.value.toLowerCase()
      );
      if (match) distSel.value = match.value;
    }

    searchStations();
  }, 250);
}


// ---- FILTER GAS SHOPS ----
function filterGasShops() {
  const provider = document.getElementById('gasProviderFilter')?.value || '';
  const cylinder = document.getElementById('gasCylinderFilter')?.value || '';
  const district = document.getElementById('gasDistrictFilter')?.value || '';

  const results = DB.gasShops.filter(s => {
    const pOk = !provider || s.provider === provider || (provider === 'Litro' && s.provider === 'Both') || (provider === 'LAUGFS' && s.provider === 'Both');
    const dOk = !district || s.district === district;
    const cOk = !cylinder || s.stock[cylinder] !== undefined;
    return pOk && dOk && cOk;
  });

  // Sort by distance if location available
  if (typeof userLat !== 'undefined' && userLat !== null && userLng !== null) {
    results.sort((a, b) => {
      const dA = haversineKm(userLat, userLng, a.lat, a.lng);
      const dB = haversineKm(userLat, userLng, b.lat, b.lng);
      return dA - dB;
    });
  }

  document.getElementById('gasShopsList').innerHTML =
    results.map(s => renderGasShopCard(s)).join('') ||
    `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px;">${t('no_gas_found') || 'No gas shops found.'}</p>`;
}

// ---- PRICES PAGE ----
function renderPricesPage() {
  const changeHtml = (curr, prev) => {
    const diff = curr - prev;
    if (diff > 0) return `<span class="change-badge change-up">▲ ${diff}</span>`;
    if (diff < 0) return `<span class="change-badge change-down">▼ ${Math.abs(diff)}</span>`;
    return `<span class="change-badge change-same">— Same</span>`;
  };

  // CPC
  document.getElementById('cpcPriceTable').innerHTML = DB.fuelPrices.cpc.map(f => `
    <tr>
      <td>${f.type}</td>
      <td><span class="price-val">LKR ${f.price.toLocaleString()}</span> / ${f.unit}</td>
      <td>${changeHtml(f.price, f.prevPrice)}</td>
    </tr>
  `).join('');

  // IOC
  document.getElementById('iocPriceTable').innerHTML = DB.fuelPrices.ioc.map(f => `
    <tr>
      <td>${f.type}</td>
      <td><span class="price-val">LKR ${f.price.toLocaleString()}</span> / ${f.unit}</td>
      <td>${changeHtml(f.price, f.prevPrice)}</td>
    </tr>
  `).join('');

  // Gas
  const allGas = [
    ...DB.gasPrices.litro.map(g => ({ ...g, provider: 'Litro Gas Lanka' })),
    ...DB.gasPrices.laugfs.map(g => ({ ...g, provider: 'LAUGFS Gas PLC' })),
  ];
  const statusClassFn = s => s==='available'?'status-available':s==='limited'?'status-limited':'status-out';
  const statusLabel = s => s==='available'?'Available':s==='limited'?'Limited':'Out of Stock';
  document.getElementById('gasPriceTable').innerHTML = allGas.map(g => `
    <tr>
      <td>${g.provider}</td>
      <td>${g.size}</td>
      <td><span class="price-val">LKR ${g.price.toLocaleString()}</span></td>
      <td><span class="oc-status ${statusClassFn(g.status)}">${t('status_' + g.status)}</span></td>
    </tr>
  `).join('');

  // Quota
  document.getElementById('quotaTable').innerHTML = DB.quotas.map(q => `
    <tr>
      <td>${q.category}</td>
      <td>${q.fuelType}</td>
      <td><span class="price-val">${q.weeklyLitres} L</span> / week</td>
      <td style="color:var(--text-muted);font-size:0.8rem;">${q.notes}</td>
    </tr>
  `).join('');
}

// ---- GAS PAGE ----
function renderGasPage() {
  // Litro
  document.getElementById('litroPrices').innerHTML = DB.gasPrices.litro.map(g => {
    const sc = g.status==='available'?'status-available':g.status==='limited'?'status-limited':'status-out';
    const sl = t('status_' + g.status);
    return `
      <div class="gpc-item">
        <div class="gpc-item-info">
          <h4>🫙 ${g.size} Cylinder</h4>
          <span class="oc-status ${sc}">${sl}</span>
        </div>
        <div class="gpc-item-price">LKR ${g.price.toLocaleString()}</div>
      </div>
    `;
  }).join('');

  // LAUGFS
  document.getElementById('laugfsPrices').innerHTML = DB.gasPrices.laugfs.map(g => {
    const sc = g.status==='available'?'status-available':g.status==='limited'?'status-limited':'status-out';
    const sl = t('status_' + g.status);
    return `
      <div class="gpc-item">
        <div class="gpc-item-info">
          <h4>🫙 ${g.size} Cylinder</h4>
          <span class="oc-status ${sc}">${sl}</span>
        </div>
        <div class="gpc-item-price">LKR ${g.price.toLocaleString()}</div>
      </div>
    `;
  }).join('');

  filterGasShops();
}

// ---- RECENT REPORTS ----
function renderRecentReports() {
  const container = document.getElementById('recentReports');
  const statusHtml = s => {
    if (s==='available') return '<span class="oc-status status-available">✅ Available</span>';
    if (s==='limited')   return '<span class="oc-status status-limited">⚠️ Limited</span>';
    return '<span class="oc-status status-out">❌ Out of Stock</span>';
  };
  container.innerHTML = DB.recentReports.map(r => `
    <div class="rr-item">
      <div class="rr-header">
        <h5>${r.station}</h5>
        <span class="rr-time">${r.time}</span>
      </div>
      <div class="rr-body">
        <span>⛽ ${r.product}</span>
        ${statusHtml(r.status)}
        <span>🚗 ${t('queue_' + r.queue)}</span>
        ${r.verified ? `<span class="rr-verified">✅ ${t('verified')}</span>` : `<span style="color:var(--text-muted);font-size:0.7rem;">${t('unverified')}</span>`}
      </div>
      <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;">${t('reported_by')} ${r.user}</div>
    </div>
  `).join('');
}

// ---- STATION MODAL ----
function openStationModal(station) {
  if (!station) return;
  const status = getStationOverallStatus(station);
  const sc     = status==='available'?'status-available':status==='limited'?'status-limited':'status-out';
  const sl     = status.charAt(0).toUpperCase()+status.slice(1);

  // Resolve real prices from DB.fuelPrices based on station company
  const priceSource = station.company === 'IOC' ? DB.fuelPrices.ioc : DB.fuelPrices.cpc;
  const realPrices = {
    petrol92:    (priceSource.find(f => f.type.includes('92'))?.price)   || 398,
    petrol95:    (priceSource.find(f => f.type.includes('95') && !f.type.includes('XP-95') || f.type.includes('XP-95'))?.price) || 455,
    diesel:      (priceSource.find(f => f.type === 'Auto Diesel')?.price) || 382,
    superDiesel: (priceSource.find(f => f.type.includes('Super') || f.type.includes('XP Super'))?.price) || 443,
  };

  const fuelItems = Object.entries(station.fuels).map(([k, v]) => {
    const labels = { petrol92: t('card_petrol92'), petrol95: t('card_petrol95'), diesel: t('card_diesel'), superDiesel: t('card_superDiesel') };
    const chipC  = v==='available'?'chip-available':v==='limited'?'chip-limited':'chip-out';
    const stLabel = t('status_' + v);
    const price  = realPrices[k];
    return `
      <div class="mf-item">
        <h5>${labels[k]||k}</h5>
        <div class="mf-price">LKR ${price ? price.toLocaleString() : '—'}</div>
        <div class="fuel-chip ${chipC}" style="display:inline-flex"><span class="chip-dot"></span>${stLabel}</div>
      </div>
    `;
  }).join('');

  const queueLabel = station.queue === 'none' ? `✅ ${t('queue_none')}` : station.queue === 'short' ? `⏱️ ${t('queue_short')}` : station.queue === 'medium' ? `⚠️ ${t('queue_medium')}` : `🚗 ${t('queue_long')}`;

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-station-name">${station.name}</div>
    <div class="modal-info-row">
      <span>📍 ${station.address}</span>
      <span>•</span>
      <span>${station.company}</span>
      <span>•</span>
      <span class="oc-status ${sc}">${sl}</span>
    </div>
    <div class="modal-fuels-grid">${fuelItems}</div>
    <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.82rem;color:var(--text-secondary);margin-bottom:20px;">
      <span>${queueLabel}</span>
      <span>📞 ${station.phone}</span>
      <span>🕐 ${t('last_updated')}: ${station.lastUpdated}</span>
    </div>
    <div class="modal-actions">
      <button class="btn-directions" onclick="openDirections(${station.lat},${station.lng})">🗺️ ${t('directions')}</button>
      <button class="btn-report-this" onclick="closeModal();navigateTo('report')">📝 ${t('report_update')}</button>
    </div>
  `;
  document.getElementById('stationModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('stationModal').classList.add('hidden');
}

function openDirections(lat, lng) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
}

// ---- REPORT FORM ----
let selectedStatus = 'available';

function selectStatus(val) {
  selectedStatus = val;
  document.querySelectorAll('#statusPicker .sp-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`#statusPicker .sp-${val}`)?.classList.add('active');
}

// (Moved to app.js as setReportType)

function submitReport(e) {
  e.preventDefault();
  const station = document.getElementById('rStation').value;
  const product = document.getElementById('rProduct').value;
  const queue   = document.getElementById('rQueue').value;
  const notes   = document.getElementById('rNotes').value;

  if (!station || !product) {
    showToast('Please fill out all required fields.', 'error');
    return;
  }

  // Add to local reports
  DB.recentReports.unshift({
    station, 
    product: product,
    category: window.currentReportType || 'fuel',
    status: selectedStatus, 
    queue, 
    time: 'Just now',
    verified: false, 
    user: 'You'
  });

  renderRecentReports();
  e.target.reset();
  selectStatus('available');
  showToast('✅ Report submitted successfully! Thank you.', 'success');
}

// ---- TOAST ----
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}
