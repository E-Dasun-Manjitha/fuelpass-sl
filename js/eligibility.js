// ============================================================
// eligibility.js  –  Eligibility UI using VEHICLES engine
// Depends on: vehicles.js
// ============================================================

// ── COMBINED CHECK ─────────────────────────────────────────
function runCombinedCheck() {
  const rawPlate  = (document.getElementById('qcPlate')?.value || '').trim();
  const usedInput = parseFloat(document.getElementById('qcUsed')?.value) || 0;
  const el        = document.getElementById('combinedResult');
  if (!el) return;

  if (!rawPlate) {
    el.innerHTML = `<div class="cr-placeholder cr-error"><span>⚠️</span>Please enter your vehicle number plate.</div>`;
    return;
  }

  // Run through vehicle engine
  const report = VEHICLES.getEligibilityReport(rawPlate, null, usedInput);

  if (!report.valid) {
    el.innerHTML = `<div class="cr-placeholder cr-error">
      <span>❌</span>
      <strong>Invalid plate format</strong>
      <p style="font-size:0.82rem;line-height:1.6;">${report.error.replace(/\n/g,'<br/>')}</p>
      <p class="cr-demo-hint">Try: <strong>ABC-1234</strong> · <strong>AB-5678</strong> · <strong>WP CAR 1234</strong> · <strong>CAB-5678</strong></p>
    </div>`;
    return;
  }

  // If new format — no type detected, need selection
  let typeWarning = '';
  if (report.needsTypeSelection) {
    const sel = document.getElementById('qcVehicleType');
    const selectedType = sel ? sel.value : 'car';
    const rerun = VEHICLES.getEligibilityReport(rawPlate, selectedType, usedInput);
    renderCombinedResult(el, rerun);
    return;
  }

  renderCombinedResult(el, report);
}

function renderCombinedResult(el, r) {
  const oe         = r.oddEven;
  const passColor  = r.canFill ? 'verdict-pass' : 'verdict-fail';
  const passIcon   = r.canFill ? '✅' : '❌';
  const passText   = r.canFill
    ? `${passIcon} ${r.vehicleLabel} — You CAN fill fuel today`
    : `${passIcon} ${r.vehicleLabel} — You CANNOT fill fuel today`;

  // Odd/Even section
  let oeHtml = '';
  if (oe.exempt) {
    oeHtml = `<div class="cr-verdict verdict-warn">⚡ ${oe.reason}</div>`;
  } else {
    const oeColor = oe.eligible ? 'verdict-pass' : 'verdict-fail';
    oeHtml = `
      <div class="cr-row"><span>Today's Date</span><span>${oe.dateNum} (${oe.todayOdd ? 'Odd' : 'Even'})</span></div>
      <div class="cr-row"><span>Plate Last Digit</span><span>${r.lastDigit} (${r.isOdd ? 'Odd' : 'Even'})</span></div>
      <div class="cr-verdict ${oeColor}">${oe.eligible ? '✅ Plate matches today' : '❌ Plate does not match today'}</div>
      <p class="cr-tip">${oe.reason}</p>`;
  }

  // Quota section
  const pct          = r.weeklyQuota > 0 ? Math.min(100, Math.round((r.usedLitres / r.weeklyQuota) * 100)) : 0;
  const remainColor  = r.remaining <= 0 ? '#EF4444' : r.remaining < r.weeklyQuota * 0.3 ? '#F59E0B' : '#10B981';
  const barWidth     = Math.min(100, pct);

  // Format & province row
  let plateInfoHtml = `<div class="cr-row"><span>Plate Format</span><span>${r.format}</span></div>`;
  if (r.province) plateInfoHtml += `<div class="cr-row"><span>Province</span><span>${r.province}</span></div>`;
  if (r.typeCode) plateInfoHtml += `<div class="cr-row"><span>Vehicle Code</span><span>${r.typeCode}</span></div>`;
  if (r.note)     plateInfoHtml += `<p class="cr-tip" style="margin-top:8px;">ℹ️ ${r.note}</p>`;

  el.innerHTML = `
    <div class="cr-verdict-main ${passColor}">${passText}</div>
    <div class="cr-grid">

      <!-- Plate Info -->
      <div class="cr-section">
        <h4>🔍 Plate Details</h4>
        <div class="cr-row"><span>Registered Plate</span><span style="font-family:'Space Grotesk',sans-serif;font-weight:800;color:var(--blue);">${r.plate}</span></div>
        <div class="cr-row"><span>Detected Type</span><span>${r.vehicleLabel}</span></div>
        <div class="cr-row"><span>Fuel Type</span><span>${r.fuelType === 'petrol' ? '🟢 Petrol' : r.fuelType === 'diesel' ? '🟡 Diesel' : '⛽ Petrol / Diesel'}</span></div>
        ${plateInfoHtml}
      </div>

      <!-- Odd/Even -->
      <div class="cr-section">
        <h4>📅 Odd / Even Rule</h4>
        ${oeHtml}
      </div>

      <!-- Quota -->
      <div class="cr-section">
        <h4>⛽ Weekly Quota</h4>
        <div class="cr-row"><span>Weekly Allowance</span><span style="color:var(--green);font-weight:700;">${r.weeklyQuota} L</span></div>
        <div class="cr-row"><span>Used This Week</span><span>${r.usedLitres} L</span></div>
        <div class="cr-row"><span>Remaining</span><span style="color:${remainColor};font-weight:700;">${r.remaining} L</span></div>
        <div style="margin-top:10px;background:rgba(255,255,255,0.06);border-radius:99px;height:8px;overflow:hidden;">
          <div style="height:100%;width:${barWidth}%;background:${barWidth > 80 ? '#EF4444' : barWidth > 50 ? '#F59E0B' : '#10B981'};border-radius:99px;transition:width 0.6s ease;"></div>
        </div>
        <p class="cr-tip">${pct}% of weekly quota used. Resets every Monday.</p>
        ${r.remaining <= 0 ? '<div class="cr-verdict verdict-fail">❌ Quota exhausted for this week.</div>' : ''}
      </div>

    </div>`;

  // Show 7-day calendar below
  renderOddEvenCalendar(r.lastDigit, r.vehicleType);
}

// ── VEHICLE TYPE CHANGE HANDLER ────────────────────────────
function onVehicleTypeChange() {
  const plate = document.getElementById('qcPlate')?.value || '';
  if (plate.trim().length > 2) runCombinedCheck();
}

// ── SIMULATOR ──────────────────────────────────────────────
function updateSimulator() {
  const rawType  = document.getElementById('simVehicleType')?.value || 'car';
  const used     = parseFloat(document.getElementById('simUsed')?.value)   || 0;
  const fill     = parseFloat(document.getElementById('simFill')?.value)   || 0;
  const el       = document.getElementById('simResult');
  if (!el) return;

  const quota    = VEHICLES.getQuota(rawType);
  const wq       = quota.weekly;
  const after    = Math.max(0, used + fill);
  const allowed  = Math.min(fill, Math.max(0, wq - used));
  const remaining = Math.max(0, wq - after);

  // Estimate cost using live prices
  const prices = (typeof AUTH !== 'undefined') ? AUTH.getPrices() : null;
  const petrolPrice = prices?.petrol92 || 398;
  const dieselPrice = prices?.autoDiesel || 382;
  const pricePerL = quota.fuelType === 'diesel' ? dieselPrice : petrolPrice;
  const cost = Math.round(allowed * pricePerL);

  const pctBefore = Math.min(100, Math.round((used / wq) * 100));
  const pctAfter  = Math.min(100, Math.round((after / wq) * 100));
  const barColor  = pctAfter > 90 ? '#EF4444' : pctAfter > 60 ? '#F59E0B' : '#10B981';

  el.innerHTML = `
    <div class="sim-panels">
      <div class="sim-panel">
        <h4>Before Fill</h4>
        <div class="sim-big-num" style="color:${pctBefore > 80 ? '#EF4444' : '#10B981'};">${Math.max(0, wq - used)}L</div>
        <div class="sim-sub">Remaining of ${wq}L quota</div>
        <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px;overflow:hidden;">
          <div style="width:${pctBefore}%;height:100%;background:${pctBefore > 80 ? '#EF4444' : '#F59E0B'};border-radius:99px;"></div>
        </div>
      </div>
      <div class="sim-arrow">→</div>
      <div class="sim-panel">
        <h4>After Fill (${allowed}L allowed)</h4>
        <div class="sim-big-num" style="color:${remaining <= 0 ? '#EF4444' : barColor};">${remaining}L</div>
        <div class="sim-sub">Remaining after refill</div>
        <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:6px;overflow:hidden;">
          <div style="width:${pctAfter}%;height:100%;background:${barColor};border-radius:99px;"></div>
        </div>
      </div>
    </div>
    <div class="sim-summary">
      <div class="sim-s-row"><span>${quota.label}</span><span>Weekly: ${wq}L</span></div>
      <div class="sim-s-row"><span>You want to fill</span><span>${fill} L</span></div>
      <div class="sim-s-row"><span>You are allowed to fill</span><span style="color:var(--green);font-weight:700;">${allowed} L</span></div>
      <div class="sim-s-row"><span>Estimated cost (${quota.fuelType === 'diesel' ? 'Diesel' : 'Petrol 92'})</span><span style="color:var(--amber);">LKR ${cost.toLocaleString()}</span></div>
      ${allowed < fill ? `<div class="sim-s-row" style="color:var(--amber);"><span>⚠️ Limited by quota</span><span>${fill - allowed}L over-limit, not allowed</span></div>` : ''}
    </div>`;
}

// ── 7-DAY ODD/EVEN CALENDAR ────────────────────────────────
function renderOddEvenCalendar(lastDigit = null, vehicleType = null) {
  const el = document.getElementById('oddEvenCalendar');
  if (!el) return;

  const today    = new Date();
  const days     = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const exempt   = vehicleType === 'motorcycle' || vehicleType === 'threewheeler';

  let html = '<div class="oec-grid">';
  for (let i = 0; i < 7; i++) {
    const d      = new Date(today);
    d.setDate(today.getDate() + i);
    const dateN  = d.getDate();
    const dayN   = d.getDay();
    const isOdd  = dateN % 2 !== 0;
    const isTday = i === 0;

    let eligible = exempt ? true : (lastDigit !== null ? (isOdd === (lastDigit % 2 !== 0)) : null);
    let dayClass = isOdd ? 'oec-is-odd' : 'oec-is-even';
    if (isTday) dayClass += ' oec-today';

    const parityLabel = isOdd ? 'ODD' : 'EVEN';
    const plates      = isOdd
      ? 'Plates: 1,3,5,7,9'
      : 'Plates: 0,2,4,6,8';

    let eligBadge = '';
    if (lastDigit !== null && !exempt) {
      eligBadge = eligible
        ? `<span style="font-size:0.65rem;color:var(--green);font-weight:700;">✅ YOU</span>`
        : `<span style="font-size:0.65rem;color:var(--text-muted);">—</span>`;
    } else if (exempt) {
      eligBadge = `<span style="font-size:0.62rem;color:var(--amber);">EXEMPT</span>`;
    }

    html += `
      <div class="oec-day-big ${dayClass}">
        ${isTday ? '<span class="oec-today-tag">TODAY</span>' : ''}
        <span class="oec-dayname">${days[dayN]}</span>
        <span class="oec-datenum">${dateN}</span>
        <span class="oec-mon">${months[d.getMonth()]}</span>
        <span class="oec-parity-badge">${parityLabel}</span>
        <span class="oec-plates">${plates}</span>
        ${eligBadge}
      </div>`;
  }
  html += '</div>';

  // Weekly summary
  const oddDays  = [0,1,2,3,4,5,6].filter(i => { const d = new Date(today); d.setDate(today.getDate()+i); return d.getDate() % 2 !== 0; }).length;
  html += `
    <div class="weekly-overview-inner" style="margin-top:16px;">
      <div class="wo-item"><div class="wo-label">Odd days (next 7)</div><div class="wo-val" style="color:var(--blue);">${oddDays}</div></div>
      <div class="wo-item"><div class="wo-label">Even days (next 7)</div><div class="wo-val" style="color:var(--amber);">${7 - oddDays}</div></div>
      ${lastDigit !== null ? `<div class="wo-item"><div class="wo-label">Your plate ends in</div><div class="wo-val">${lastDigit} (${lastDigit%2!==0?'Odd':'Even'})</div></div>` : ''}
      ${exempt ? '<div class="wo-item" style="border-color:rgba(245,158,11,0.3);"><div class="wo-label">Exemption</div><div class="wo-val" style="color:var(--amber);font-size:0.85rem;">Odd/Even Exempt</div></div>' : ''}
    </div>`;

  el.innerHTML = html;
}

// ── STATUS PICKER HELPERS ──────────────────────────────────
function selectStatus(val) {
  document.querySelectorAll('#statusPicker .sp-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.value === val);
  });
}

// ── INIT ──────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  try {
    renderOddEvenCalendar();
    updateSimulator();

    // Show sample plates as placeholder hints
    const plateInput = document.getElementById('qcPlate');
    if (plateInput) {
      const samples  = VEHICLES.samplePlates;
      let  si        = 0;
      plateInput.setAttribute('placeholder', samples[0].plate);
      setInterval(() => {
        si = (si + 1) % samples.length;
        plateInput.setAttribute('placeholder', samples[si].plate + '  ← ' + samples[si].desc);
      }, 3000);
    }
  } catch(e) { console.warn('Eligibility init error:', e); }
});
