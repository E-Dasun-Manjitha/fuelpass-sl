// ============================================================
// owner.js  –  Station Owner Login + Verified Report logic
// NOW CONNECTED TO BACKEND API via api.js
// ============================================================

let vrStatus = 'available';
let reportFilter = 'all';

// ── OWNER LOGIN MODAL ──────────────────────────────────────
function openOwnerLogin() {
  const modal = document.getElementById('ownerLoginModal');
  if (modal) modal.classList.remove('hidden');
  if (AUTH.isLoggedIn() && AUTH.getSession().role === 'owner') {
    closeOwnerLogin();
    navigateTo('report');
  }
}
function closeOwnerLogin() {
  const modal = document.getElementById('ownerLoginModal');
  if (modal) modal.classList.add('hidden');
}

// ── OWNER LOGIN  →  now calls backend API ──────────────────
async function doOwnerLogin() {
  const code  = (document.getElementById('loginStationCode').value || '').trim().toUpperCase();
  const pw    = (document.getElementById('loginPassword').value || '').trim();
  const errEl = document.getElementById('loginErrorMsg');
  errEl.style.display = 'none';

  if (!code || !pw) {
    errEl.style.display = 'block';
    errEl.textContent   = 'Please enter Station Code and Password.';
    return;
  }

  // Show loading state
  const btn = document.querySelector('#ownerLoginModal .btn-primary');
  if (btn) btn.textContent = 'Logging in…';

  try {
    const resp = await apiOwnerLogin(code, pw);

    if (resp && resp.success) {
      // Store JWT token + session in localStorage
      Auth.setToken(resp.token);
      AUTH.setSession({
        role:        'owner',
        stationCode: resp.owner.station_code,
        stationName: resp.owner.station_name,
        ownerName:   resp.owner.owner_name,
        token:       resp.token,
      });

      closeOwnerLogin();
      updateOwnerUI();
      navigateTo('report');
      showToast('✅ Logged in as ' + resp.owner.station_name, 'success');
    } else {
      errEl.style.display = 'block';
      errEl.textContent   = '❌ ' + (resp?.error || 'Invalid credentials');
    }
  } catch (err) {
    errEl.style.display = 'block';
    errEl.textContent   = '❌ Network error – check your connection.';
  } finally {
    if (btn) btn.textContent = 'Login';
  }
}

function ownerLogout() {
  Auth.clearToken();
  AUTH.clearSession();
  updateOwnerUI();
  showToast('Logged out from Owner Panel.', 'info');
}

// ── UPDATE UI BASED ON LOGIN STATE ───────────────────────
function updateOwnerUI() {
  const session = AUTH.getSession();
  const isOwner = session && session.role === 'owner';

  const btn = document.getElementById('ownerLoginBtn');
  if (btn) btn.textContent = isOwner ? ('✅ ' + session.stationCode) : '🔑 Owner Login';

  const banner  = document.getElementById('ownerActiveBanner');
  const notice  = document.getElementById('ownerLoginNotice');
  const ownerFm = document.getElementById('ownerReportForm');

  if (isOwner) {
    if (banner)  banner.style.display  = 'flex';
    if (notice)  notice.style.display  = 'none';
    if (ownerFm) ownerFm.style.display = 'block';
    const nameEl = document.getElementById('obOwnerName');
    const codeEl = document.getElementById('obStationCode');
    if (nameEl) nameEl.textContent = session.ownerName;
    if (codeEl) codeEl.textContent = session.stationCode;
  } else {
    if (banner)  banner.style.display  = 'none';
    if (notice)  notice.style.display  = 'flex';
    if (ownerFm) ownerFm.style.display = 'none';
  }
}

// ── VERIFIED REPORT SUBMISSION  →  saves to DB ────────────
function selectVrStatus(s) {
  vrStatus = s;
  document.querySelectorAll('#ownerReportForm .sp-btn').forEach(b => {
    b.classList.remove('active');
    if (b.dataset.value === s) b.classList.add('active');
  });
}

async function submitVerifiedReport(e) {
  e.preventDefault();
  const session = AUTH.getSession();
  if (!session || session.role !== 'owner') {
    showToast('You must be logged in as a station owner.', 'error');
    return;
  }

  const product  = document.getElementById('vrProduct').value;
  const queue    = document.getElementById('vrQueue').value;
  const duration = document.getElementById('vrDuration').value;
  const notes    = document.getElementById('vrNotes').value;

  if (!product) { showToast('Please select a fuel type.', 'error'); return; }

  const submitBtn = document.getElementById('vrSubmitBtn');
  if (submitBtn) submitBtn.textContent = 'Submitting…';

  try {
    // 1. Save verified report to database
    const reportResp = await apiSubmitVerifiedReport({
      station_name: session.stationName || session.stationCode,
      product,
      status:  vrStatus,
      queue,
      notes:   duration ? `Duration: ${duration}. ${notes}` : notes,
    });

    if (!reportResp || !reportResp.success) throw new Error(reportResp?.error || 'API error');

    // 2. Also update the station's live fuel status in database
    //    Find the station by station code
    const station = DB.stations.find(s =>
      s.id === session.stationCode ||
      s.name?.toLowerCase().includes((session.stationName || '').toLowerCase())
    );

    if (station) {
      // Map product name → fuel_type key
      const fuelMap = {
        'Petrol 92': 'petrol92', 'petrol92': 'petrol92',
        'Petrol 95': 'petrol95', 'petrol95': 'petrol95',
        'Auto Diesel': 'diesel', 'diesel': 'diesel',
        'Super Diesel': 'superDiesel', 'superDiesel': 'superDiesel',
      };
      const fuelKey = fuelMap[product] || product;
      await apiUpdateStationStatus(station.id, {
        fuel_type: fuelKey,
        status:    vrStatus,
        queue:     queue || 'none',
      });
    }

    // 3. Update local display immediately (optimistic UI)
    const localReport = {
      stationName: session.stationName || session.stationCode,
      product, status: vrStatus, queue, notes,
      submittedAt: new Date().toISOString(),
      _source: 'owner',
      ownerName: session.ownerName,
    };
    _verifiedReports.unshift(localReport);
    if (_verifiedReports.length > 50) _verifiedReports = _verifiedReports.slice(0, 50);

    document.getElementById('vrNotes').value = '';
    showToast('✅ Verified update saved to database! Users can now see your station status.', 'success');
    filterReportsFeed(reportFilter);

  } catch (err) {
    console.error('Verified report error:', err);
    showToast('❌ Failed to save report: ' + err.message, 'error');
  } finally {
    if (submitBtn) submitBtn.textContent = 'Submit Verified Report';
  }
}

// ── REPORT FEED ───────────────────────────────────────────
let _verifiedReports  = [];
let _communityReports = [];

// Load reports from database on page visit
async function loadReportsFeed() {
  try {
    const [verifiedResp, communityResp] = await Promise.all([
      apiGetReports(true),   // verified=true
      apiGetReports(false),  // verified=false
    ]);

    if (verifiedResp?.data)  _verifiedReports  = verifiedResp.data.map(normaliseReport);
    if (communityResp?.data) _communityReports = communityResp.data.map(normaliseReport);
  } catch (err) {
    console.warn('Could not load reports from API:', err.message);
  }
  filterReportsFeed(reportFilter);
}

function normaliseReport(r) {
  return {
    stationName: r.station_name,
    product:     r.product,
    status:      r.status,
    queue:       r.queue,
    notes:       r.notes,
    submittedAt: r.created_at,
    _source:     r.verified ? 'owner' : 'community',
    ownerName:   r.reporter,
  };
}

function filterReportsFeed(filter) {
  reportFilter = filter;
  ['All','Verified','Community'].forEach(f => {
    const b = document.getElementById('filter' + f + 'Btn');
    if (b) b.classList.toggle('active', filter === f.toLowerCase());
  });
  renderReportsFeed();
}

function renderReportsFeed() {
  const el = document.getElementById('recentReports');
  if (!el) return;

  let combined = [];
  if (reportFilter === 'verified')   combined = _verifiedReports.map(r => ({ ...r, _source: 'owner' }));
  else if (reportFilter === 'community') combined = _communityReports.map(r => ({ ...r, _source: 'community' }));
  else combined = [
    ..._verifiedReports.map(r  => ({ ...r, _source: 'owner' })),
    ..._communityReports.map(r => ({ ...r, _source: 'community' })),
  ].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  if (!combined.length) {
    el.innerHTML = '<div style="text-align:center;padding:32px;color:var(--text-muted);">No reports yet. Be the first to report!</div>';
    return;
  }

  el.innerHTML = combined.map(r => {
    const st   = r.status === 'available' ? 'status-available' : r.status === 'limited' ? 'status-limited' : 'status-out';
    const sl   = r.status === 'available' ? '✅ Available'      : r.status === 'limited' ? '⚠️ Limited'     : '❌ Out';
    const time = r.submittedAt ? timeAgo(new Date(r.submittedAt)) : 'Just now';
    const isOwner = r._source === 'owner';

    return `<div class="report-item ${isOwner ? 'report-verified' : ''}">
      <div class="ri-header">
        <div>
          <strong class="ri-station">${r.stationName || 'Unknown'}</strong>
          ${isOwner
            ? `<span class="verified-owner-badge">✅ VERIFIED OWNER</span>`
            : `<span class="community-badge">👥 Community</span>`}
        </div>
        <span class="oc-status ${st}" style="font-size:0.72rem;">${sl}</span>
      </div>
      <div class="ri-details">
        ${r.product  ? `<span>⛽ ${r.product}</span>` : ''}
        ${r.queue && r.queue !== 'none' ? `<span>🚗 ${r.queue} queue</span>` : '<span>🚗 No queue</span>'}
      </div>
      ${r.notes ? `<div class="ri-notes">${r.notes}</div>` : ''}
      <div class="ri-footer">
        <span>${isOwner ? (r.ownerName || 'Verified Owner') : 'Community Member'}</span>
        <span>${time}</span>
      </div>
    </div>`;
  }).join('');
}

// ── COMMUNITY REPORT  →  saves to DB ─────────────────────
window.submitReport = async function(e) {
  e.preventDefault();
  const station = document.getElementById('rStation').value.trim();
  const product = document.getElementById('rProduct').value;
  const queue   = document.getElementById('rQueue').value;
  const notes   = document.getElementById('rNotes').value;
  const picker  = document.querySelector('#statusPicker .sp-btn.active');
  const status  = picker ? picker.dataset.value : 'available';

  if (!station) { showToast('Please enter a station name.', 'error'); return; }

  try {
    // Save to database
    const resp = await apiSubmitReport({ station_name: station, product, status, queue, notes });

    // Optimistic local update regardless of API result
    _communityReports.unshift({
      stationName: station, product, queue, notes, status,
      submittedAt: new Date().toISOString(), _source: 'community',
    });
    if (_communityReports.length > 50) _communityReports = _communityReports.slice(0, 50);

    document.getElementById('reportForm').reset();
    document.querySelectorAll('#statusPicker .sp-btn').forEach(b => b.classList.remove('active'));
    const firstBtn = document.querySelector('#statusPicker .sp-btn');
    if (firstBtn) firstBtn.classList.add('active');

    if (resp?.success) {
      showToast('📤 Report saved to database! Thank you for helping the community.', 'success');
    } else {
      showToast('📤 Report submitted locally (API unavailable).', 'info');
    }
    filterReportsFeed(reportFilter);

  } catch (err) {
    showToast('❌ Could not submit report: ' + err.message, 'error');
  }
};

// renderRecentReports override – load from API
window.renderRecentReports = function() {
  updateOwnerUI();
  loadReportsFeed();   // ← fetches from database
};

// ── HELPERS ───────────────────────────────────────────────
// timeAgo removed - using centralized version in api.js

// ── INIT ─────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  try { updateOwnerUI(); } catch(e) {}
});
