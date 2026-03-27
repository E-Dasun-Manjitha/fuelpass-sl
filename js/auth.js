// ============================================================
// auth.js  –  Authentication system (localStorage-based)
// Admin panel: admin.html | Owner login: modal on index.html
// ============================================================

const AUTH = {
  ADMIN_PASSWORD: 'FuelPassAdmin@2026',   // Change this in production
  SESSION_KEY:    'fuelpass_session',
  OWNERS_KEY:     'fuelpass_owners',
  PENDING_KEY:    'fuelpass_pending',
  PRICES_KEY:     'fuelpass_prices',
  REPORTS_KEY:    'fuelpass_verified_reports',

  // ── Session ──────────────────────────────────────────────
  getSession() {
    try { return JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || 'null'); }
    catch { return null; }
  },
  setSession(data) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({ ...data, loginTime: Date.now() }));
  },
  clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  },
  isLoggedIn() {
    const s = this.getSession();
    return s && (Date.now() - s.loginTime < 8 * 60 * 60 * 1000); // 8hr session
  },
  isAdmin() {
    const s = this.getSession();
    return s && s.role === 'admin';
  },

  // ── Owner CRUD ─────────────────────────────────────────────
  getOwners() {
    try { return JSON.parse(localStorage.getItem(this.OWNERS_KEY) || '[]'); }
    catch { return []; }
  },
  saveOwners(owners) {
    localStorage.setItem(this.OWNERS_KEY, JSON.stringify(owners));
  },
  getPending() {
    try { return JSON.parse(localStorage.getItem(this.PENDING_KEY) || '[]'); }
    catch { return []; }
  },
  savePending(list) {
    localStorage.setItem(this.PENDING_KEY, JSON.stringify(list));
  },

  // ── Register (Pending) ─────────────────────────────────────
  submitRegistration(data) {
    const pending = this.getPending();
    const id = 'REG-' + Date.now();
    pending.push({ ...data, id, submittedAt: new Date().toISOString(), status: 'pending' });
    this.savePending(pending);
    return id;
  },

  // ── Admin: Approve Owner ───────────────────────────────────
  approveOwner(regId, password, stationCode) {
    const pending = this.getPending();
    const idx = pending.findIndex(p => p.id === regId);
    if (idx === -1) return false;
    const reg = pending[idx];
    const owners = this.getOwners();
    owners.push({
      ...reg,
      status: 'approved',
      password,
      stationCode,
      approvedAt: new Date().toISOString(),
      updatedAt: null,
      updateCount: 0
    });
    this.saveOwners(owners);
    pending.splice(idx, 1);
    this.savePending(pending);
    return true;
  },

  // ── Admin: Reject ──────────────────────────────────────────
  rejectOwner(regId) {
    const pending = this.getPending();
    const idx = pending.findIndex(p => p.id === regId);
    if (idx === -1) return false;
    pending[idx].status = 'rejected';
    // Keep for records but remove from pending list
    const rejected = JSON.parse(localStorage.getItem('fuelpass_rejected') || '[]');
    rejected.push(pending[idx]);
    localStorage.setItem('fuelpass_rejected', JSON.stringify(rejected));
    pending.splice(idx, 1);
    this.savePending(pending);
    return true;
  },

  // ── Owner Login ────────────────────────────────────────────
  ownerLogin(stationCode, password) {
    const owners = this.getOwners();
    const owner = owners.find(o =>
      o.stationCode === stationCode.trim().toUpperCase() &&
      o.password === password &&
      o.status === 'approved'
    );
    if (owner) {
      this.setSession({ role: 'owner', stationCode: owner.stationCode, ownerName: owner.ownerName, stationType: owner.stationType, stationName: owner.stationName, id: owner.id });
      return { success: true, owner };
    }
    return { success: false, error: 'Invalid station code or password.' };
  },

  // ── Admin Login ────────────────────────────────────────────
  adminLogin(password) {
    if (password === this.ADMIN_PASSWORD) {
      this.setSession({ role: 'admin' });
      return true;
    }
    return false;
  },

  // ── Verified Reports ───────────────────────────────────────
  getVerifiedReports() {
    try { return JSON.parse(localStorage.getItem(this.REPORTS_KEY) || '[]'); }
    catch { return []; }
  },
  addVerifiedReport(report) {
    const session = this.getSession();
    if (!session || session.role !== 'owner') return false;
    const reports = this.getVerifiedReports();
    reports.unshift({
      ...report,
      stationCode: session.stationCode,
      stationName: session.stationName,
      ownerName:   session.ownerName,
      submittedAt: new Date().toISOString(),
      verified: true,
      source: 'station-owner'
    });
    localStorage.setItem(this.REPORTS_KEY, JSON.stringify(reports.slice(0, 100))); // keep last 100
    // Also update owner's update count
    const owners = this.getOwners();
    const idx = owners.findIndex(o => o.stationCode === session.stationCode);
    if (idx > -1) {
      owners[idx].updateCount = (owners[idx].updateCount || 0) + 1;
      owners[idx].updatedAt = new Date().toISOString();
      this.saveOwners(owners);
    }
    return true;
  },

  // ── Price Management ───────────────────────────────────────
  getPrices() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.PRICES_KEY) || 'null');
      return saved || this.getDefaultPrices();
    } catch { return this.getDefaultPrices(); }
  },
  savePrices(prices) {
    localStorage.setItem(this.PRICES_KEY, JSON.stringify({ ...prices, updatedAt: new Date().toISOString() }));
  },
  getDefaultPrices() {
    return {
      petrol92: 398, petrol95: 455, autoDiesel: 382,
      superDiesel: 443, kerosene: 255,
      litroGas125: 4040, litroGas5: 1620, litroGas375: 9970,
      laugfsGas125: 4040, laugfsGas5: 1620, laugfsGas375: 9970,
      updatedAt: '2026-03-21T00:00:00.000Z',
      updatedBy: 'System (Ceypetco effective March 21, 2026)'
    };
  }
};
