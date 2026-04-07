// app.js – Main application controller, SPA routing, init
// ============================================================

let currentReportType = 'fuel'; // Default report type
window.currentReportType = currentReportType;

// ---- SPA NAVIGATION ----
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  // Close mobile menu
  document.getElementById('navLinks')?.classList.remove('open');

  // Push to history if navigation is called directly (not via hashchange)
  if (window.location.hash.replace('#', '') !== page) {
    history.pushState({ page }, '', page === 'dashboard' ? '#' : `#${page}`);
  }

  // Page-specific init
  if (page === 'dashboard') setTimeout(() => { if (map) map.invalidateSize(); }, 100);
  if (page === 'stations')   try { searchStations(); }         catch(e) {}
  if (page === 'gas')        try { renderGasPage(); }          catch(e) {}
  if (page === 'prices')     try { renderPricesPage(); }       catch(e) {}
  if (page === 'eligibility')try { initOddEvenFromToday(); }   catch(e) {}
  if (page === 'report')     try { 
    renderRecentReports(); 
    updateQueueOptions();
  } catch(e) {}
}

// ---- REPORT TYPE TOGGLE ----
function setReportType(type) {
  currentReportType = type;
  window.currentReportType = type;
  // If we're already on report page, update it instantly
  const activePage = document.querySelector('.page.active')?.id;
  if (activePage === 'page-report') {
    updateQueueOptions();
    // Pre-populate report type dropdown
    const rType = document.getElementById('rType');
    if (rType) rType.value = type;
    
    // Update labels and placeholders
    const rLabel = document.querySelector('label[for="rStation"]') || document.querySelector('label[data-i18n="report_station_name"]');
    const rInput = document.getElementById('rStation');
    if (type === 'fuel') {
      if (rLabel) rLabel.textContent = t('report_station_name');
      if (rInput) rInput.placeholder = t('rStation_ph');
      updateProductOptions('fuel');
    } else {
      if (rLabel) rLabel.textContent = t('report_shop_name');
      if (rInput) rInput.placeholder = t('rStation_ph_gas');
      updateProductOptions('gas');
    }
    
    // Highlight correct nav link
    document.querySelectorAll('.nav-link[data-page="report"]').forEach(l => {
      l.classList.toggle('active', l.dataset.reportType === type);
    });

    // Highlight correct UI toggle buttons
    const btnFuel = document.getElementById('btnReportFuel');
    const btnGas = document.getElementById('btnReportGas');
    if (btnFuel) btnFuel.classList.toggle('active', type === 'fuel');
    if (btnGas) btnGas.classList.toggle('active', type === 'gas');
  }
}

function updateQueueOptions() {
  const select = document.getElementById('rQueue');
  if (!select) return;
  
  const unit = (currentReportType === 'fuel') ? t('v_vehicles') : t('p_people');
  
  select.innerHTML = `
    <option value="none">${t('queue_none')}</option>
    <option value="short">${t('queue_short')} (< 10 ${unit})</option>
    <option value="medium">${t('queue_medium')} (10-30 ${unit})</option>
    <option value="long">${t('queue_long')} (30+ ${unit})</option>
  `;
}

function updateProductOptions(type) {
  const select = document.getElementById('rProduct');
  if (!select) return;
  
  let options = `<option value="">${t('report_product_ph')}</option>`;
  
  if (type === 'fuel') {
    options += `
      <option value="Petrol 92">Petrol 92</option>
      <option value="Petrol 95">Petrol 95</option>
      <option value="Auto Diesel">Auto Diesel</option>
      <option value="Super Diesel">Super Diesel</option>
    `;
  } else {
    options += `
      <option value="LPG 12.5 kg">LPG 12.5 kg</option>
      <option value="LPG 5 kg">LPG 5 kg</option>
      <option value="LPG 37.5 kg">LPG 37.5 kg</option>
    `;
  }
  
  select.innerHTML = options;
}

// Make globally available
window.setReportType = setReportType;

// ---- NAVBAR ----
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  // Nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => { e.preventDefault(); navigateTo(link.dataset.page); });
  });

  // Mobile toggle
  document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('open');
  });
}

// ---- REAL-TIME SIMULATION ----
const statusCycle = ['available', 'limited', 'out'];
function simulateRealTimeUpdates() {
  setInterval(async () => {
    try {
      if (typeof is_live !== 'undefined' && is_live) {
        // If live, we don't randomize! We just periodically refresh from the actual DB
        await loadLiveData();
      } else {
        // Only if offline/static: Randomly update 1–2 stations for demo
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * DB.stations.length);
          if (idx < 0) continue;
          const station = DB.stations[idx];
          if (!station || !station.fuels) continue;
          const fuelKeys = Object.keys(station.fuels);
          if (!fuelKeys.length) continue;
          const fuelKey  = fuelKeys[Math.floor(Math.random() * fuelKeys.length)];
          const newStatus = statusCycle[Math.floor(Math.random() * statusCycle.length)];
          station.fuels[fuelKey] = newStatus;
          station.lastUpdated    = 'Just now';
        }
      }

      // Sync stats UI
      document.getElementById('statStations').textContent = DB.stats.totalStations;
      document.getElementById('statGas').textContent      = DB.stats.totalGasShops;
      document.getElementById('statAvail').textContent    = DB.stats.availableStations;
      document.getElementById('statUpdated').textContent  = 'Just now';

      // Refresh visible lists & map
      refreshUIPages();
      if (map) try { renderMapMarkers(); } catch(e) {}

      // Update footer indicator
      const ou = document.getElementById('overviewUpdated');
      if (ou) ou.textContent = 'Updated just now';

    } catch(e) { console.warn('Realtime update/sync error:', e); }
  }, 30000); // every 30s
}

/**
 * Global helper to refresh UI elements on current page
 */
function refreshUIPages() {
  const activePage = document.querySelector('.page.active')?.id;
  if (activePage === 'page-dashboard') try { filterStations(); }  catch(e) {}
  if (activePage === 'page-stations')  try { searchStations(); }  catch(e) {}
  if (activePage === 'page-gas')       try { filterGasShops(); renderGasPage(); } catch(e) {}
  if (activePage === 'page-report')    try { renderRecentReports(); } catch(e) {}
}

// ---- SPLASH ----
function hideSplash() {
  // Always hide after 2s regardless of anything else
  setTimeout(() => {
    const el = document.getElementById('splash-loader');
    if (el) el.classList.add('hidden');
  }, 2000);
}

// ---- MAIN INIT ----
window.addEventListener('DOMContentLoaded', async () => {
  //  ALWAYS hide splash first — nothing should block this
  hideSplash();

  try { initNavbar(); }           catch(e) { console.warn(e); }

  // FETCH REAL POSTGRES DATA
  try { await loadLiveData(); } catch(e) { console.warn('Failed to load DB data', e); }

  // Ticker
  try { buildTicker(); }          catch(e) { console.warn(e); }

  // Stats
  try { updateStats(); }          catch(e) { console.warn(e); }

  // Sparklines
  try { drawSparkline('chart92', '#10B981'); } catch(e) {}
  try { drawSparkline('chartDsl','#F59E0B'); } catch(e) {}
  try { drawSparkline('chartGas','#EF4444'); } catch(e) {}

  // Dashboard station list
  try { filterStations(); }       catch(e) { console.warn(e); }

  // Render recent reports (for report page pre-load)
  try { renderRecentReports(); }  catch(e) { console.warn(e); }

  // Map (dashboard) – Leaflet may not load on file:// without internet
  setTimeout(() => {
    try {
      if (typeof L !== 'undefined') {
        initMap();
      } else {
        const el = document.getElementById('mainMap');
        if (el) el.innerHTML = `
          <div style="height:100%;display:flex;align-items:center;justify-content:center;
                      flex-direction:column;gap:12px;color:#64748B;font-family:Inter,sans-serif;">
            <span style="font-size:3rem"></span>
            <p>Map requires an internet connection to load tiles.</p>
          </div>`;
      }
    } catch(e) { console.warn('Map init failed:', e); }
  }, 400);

  // Eligibility
  try { initOddEvenFromToday(); } catch(e) { console.warn(e); }

  // Hash navigation
  try {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`page-${hash}`)) {
      navigateTo(hash);
    }
  } catch(e) {}
});

// Handle browser back/forward buttons smoothly
window.addEventListener('hashchange', () => {
  try {
    const page = window.location.hash.replace('#', '') || 'dashboard';
    const target = document.getElementById(`page-${page}`);
    if (target && !target.classList.contains('active')) {
      navigateTo(page);
    }
  } catch(e) {}
});

// ---- CONTACT / FEEDBACK ----
async function handleFooterContact(e) {
  e.preventDefault();
  const name = document.getElementById('fcName').value;
  const email = document.getElementById('fcEmail').value;
  const message = document.getElementById('fcMessage').value;
  const btn = e.target.querySelector('button');

  if (!name || !message) return;

  const originalText = btn.textContent;
  btn.textContent = t('loading');
  btn.disabled = true;

  try {
    const res = await apiSubmitContact({ name, email, message });
    if (res && res.success) {
      showToast(' Thank you! Feedback submitted.');
      e.target.reset();
    } else {
      showToast(' Submission failed. Please try again.');
    }
  } catch(err) {
    showToast(' Network error. Please try again.');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// Global Toast helper
window.showToast = function(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
    toast.classList.add('hidden');
  }, 4000);
}

// Make globally available
window.handleFooterContact = handleFooterContact;
