// ============================================================
// vehicles.js  –  Sri Lanka Vehicle Number Plate System
// Covers: Old (province-based), New (2000 AB-NNNN),
//         New (2013 ABC-NNNN), Special categories
// Source: Dept. of Motor Traffic Sri Lanka
// ============================================================

const VEHICLES = {

  // ── NATIONAL FUEL PASS WEEKLY QUOTAS (Official 2022 values) ──
  quotaLitres: {
    motorcycle:       4,   // Motorcycles
    threewheeler:     5,   // Three-wheelers / Tuk-tuks
    car:             20,   // Cars, taxis, cabs
    van:             40,   // Vans, dual-purpose
    suv:             20,   // SUVs, Jeeps (same as car)
    bus_private:    100,   // Private buses
    bus_school:      60,   // School vans/buses
    truck_small:     80,   // Lorries up to 8 wheels
    truck_large:    100,   // Lorries more than 8 wheels
    tractor:         20,   // Agricultural tractors
    other:           20,   // Default
  },

  // ── FUEL TYPE BY VEHICLE TYPE ──────────────────────────────
  fuelType: {
    motorcycle:    'petrol',
    threewheeler:  'petrol',  // most are petrol, some diesel
    car:           'both',    // petrol or diesel
    van:           'both',
    suv:           'both',
    bus_private:   'diesel',
    bus_school:    'diesel',
    truck_small:   'diesel',
    truck_large:   'diesel',
    tractor:       'diesel',
    other:         'both',
  },

  // ── VEHICLE TYPE LABELS ────────────────────────────────────
  labels: {
    motorcycle:    '🏍️ Motorcycle',
    threewheeler:  '🛺 Three-Wheeler',
    car:           '🚗 Car / Taxi',
    van:           '🚐 Van / Dual-Purpose',
    suv:           '🚙 SUV / Jeep',
    bus_private:   '🚌 Private Bus',
    bus_school:    '🏫 School Bus / Van',
    truck_small:   '🚚 Lorry (≤8 wheels)',
    truck_large:   '🚛 Lorry (>8 wheels)',
    tractor:       '🚜 Tractor',
    other:         '🚘 Other Vehicle',
  },

  // ── OLD FORMAT: PROVINCE CODES ─────────────────────────────
  // Pre-2001 system (e.g., WP CAR 1234)
  provinceCodes: {
    'WP': 'Western Province',
    'CP': 'Central Province',
    'NP': 'Northern Province',
    'EP': 'Eastern Province',
    'NW': 'North Western Province',
    'NWP': 'North Western Province',
    'NC': 'North Central Province',
    'SP': 'Southern Province',
    'SG': 'Sabaragamuwa Province',
    'SB': 'Sabaragamuwa Province',
    'UV': 'Uva Province',
  },

  // ── OLD FORMAT: VEHICLE TYPE CODES ────────────────────────
  // Used in pre-2001 plates: [PROVINCE] [TYPE-CODE] [NUMBER]
  typeCodesOld: {
    // Cars & Taxis
    'CAR': 'car', 'CAB': 'car', 'TX':  'car', 'TXI': 'car',
    'CA':  'car', 'PV':  'car', 'PX':  'car',
    // Vans & Dual Purpose
    'VAN': 'van', 'DP':  'van', 'DPV': 'van', 'LV': 'van',
    // Motorcycles
    'MB':  'motorcycle', 'MC':  'motorcycle', 'MO': 'motorcycle',
    'MTR': 'motorcycle',
    // Three-wheelers
    'TW':  'threewheeler', 'TU': 'threewheeler', 'TRW': 'threewheeler',
    'TA':  'threewheeler', 'TH': 'threewheeler',
    // Buses
    'BUS': 'bus_private', 'BS': 'bus_private', 'BA': 'bus_private',
    'SB':  'bus_school',  'SC': 'bus_school',
    // Trucks & Lorries
    'TK':  'truck_small', 'TR': 'truck_small', 'TRK': 'truck_small',
    'LR':  'truck_small', 'LK': 'truck_small',
    'HT':  'truck_large', 'HV': 'truck_large', 'HL': 'truck_large',
    // SUV / Jeep
    'JE':  'suv', 'JP': 'suv', 'JPS': 'suv',
    // Tractor / Land vehicle
    'LA':  'tractor', 'LE': 'tractor', 'LB': 'tractor',
    'TR1': 'tractor',
    // Special / Government
    'GS':  'other', 'GO': 'other', 'GM': 'other',
    'QR':  'other', 'PS': 'other',   // Police special
    'AF':  'other', 'SL': 'other',   // Air Force / SL Army / Navy
    'NA':  'other', 'NY': 'other',
  },

  // ── PLATE FORMAT PATTERNS ──────────────────────────────────
  patterns: {
    // NEW FORMAT (2013–present): 3 letters + 4 digits
    // e.g., ABC-1234 or ABC 1234
    new2013: /^([A-Z]{3})[\s\-]?(\d{4})$/,

    // NEW FORMAT (2000–2013): 2 letters + 4 digits
    // e.g., AB-1234 or AB 1234
    new2000: /^([A-Z]{2})[\s\-]?(\d{4})$/,

    // OLD FORMAT with province + type + number
    // e.g., WP CAR 1234  or  CP MB 4567
    oldFull: /^(WP|CP|NP|EP|NW|NWP|NC|SP|SG|SB|UV)[\s\-]([A-Z]{2,4})[\s\-]?(\d{1,4})$/,

    // OLD FORMAT: just type + number (no province)
    // e.g., CAR-1234, MB-1234
    oldNoProvince: /^([A-Z]{2,4})[\s\-](\d{1,4})$/,

    // MILITARY / GOVERNMENT special
    // e.g., SLA-34567, SLN-12345, SLAF-1234
    military: /^(SLA|SLN|SLAF|SLP|CEB|SLAS|BOC)[\s\-]?(\d{4,6})$/,

    // DIPLOMATIC
    // e.g., DP-123
    diplomatic: /^(DP|CD)[\s\-]?(\d{2,4})$/,
  },

  // ── MAIN VALIDATOR ─────────────────────────────────────────
  validate(rawPlate) {
    if (!rawPlate) return { valid: false, error: 'Please enter a vehicle number.' };

    const plate   = rawPlate.trim().toUpperCase().replace(/\s+/g, ' ');
    const compact = plate.replace(/[\s\-]/g, '');
    const result  = { raw: plate, compact, valid: false, format: null, province: null, typeCode: null, vehicleType: null, lastDigit: null, isOdd: null };

    // ── Test each pattern ──
    let m;

    // 1. New 2013 format: ABC-1234
    m = plate.match(this.patterns.new2013);
    if (!m) m = compact.match(/^([A-Z]{3})(\d{4})$/);
    if (m) {
      result.valid       = true;
      result.format      = 'New (2013+) — 3 Letters';
      result.prefix      = m[1];
      result.number      = m[2];
      result.lastDigit   = parseInt(m[2][3]);
      result.vehicleType = 'unknown'; // new format = no type encoding
      result.note        = 'New format — vehicle type not encoded in plate. Please select type below.';
      result.isOdd       = result.lastDigit % 2 !== 0;
      return result;
    }

    // 2. New 2000 format: AB-1234
    m = plate.match(this.patterns.new2000);
    if (!m) m = compact.match(/^([A-Z]{2})(\d{4})$/);
    if (m) {
      result.valid       = true;
      result.format      = 'New (2000–2013) — 2 Letters';
      result.prefix      = m[1];
      result.number      = m[2];
      result.lastDigit   = parseInt(m[2][3]);
      result.vehicleType = 'unknown';
      result.note        = 'New format — vehicle type not encoded in plate. Please select type below.';
      result.isOdd       = result.lastDigit % 2 !== 0;
      return result;
    }

    // 3. Old full format: WP CAR 1234
    m = plate.match(this.patterns.oldFull);
    if (m) {
      const typeCode    = m[2];
      const vehicleType = this.typeCodesOld[typeCode] || 'other';
      result.valid       = true;
      result.format      = 'Old (Province-Type-Number)';
      result.province    = this.provinceCodes[m[1]] || m[1];
      result.typeCode    = typeCode;
      result.number      = m[3];
      result.lastDigit   = parseInt(m[3][m[3].length - 1]);
      result.vehicleType = vehicleType;
      result.isOdd       = result.lastDigit % 2 !== 0;
      return result;
    }

    // 4. Old without province: CAR-1234
    m = plate.match(this.patterns.oldNoProvince);
    if (m) {
      const typeCode    = m[1];
      // Only accept known type codes
      if (this.typeCodesOld[typeCode]) {
        result.valid       = true;
        result.format      = 'Old (Type-Number, no province)';
        result.typeCode    = typeCode;
        result.number      = m[2];
        result.lastDigit   = parseInt(m[2][m[2].length - 1]);
        result.vehicleType = this.typeCodesOld[typeCode];
        result.isOdd       = result.lastDigit % 2 !== 0;
        return result;
      }
    }

    // 5. Military / Government
    m = plate.match(this.patterns.military);
    if (m) {
      result.valid       = true;
      result.format      = 'Military / Government';
      result.prefix      = m[1];
      result.number      = m[2];
      result.lastDigit   = parseInt(m[2][m[2].length - 1]);
      result.vehicleType = 'other';
      result.note        = 'Military/Government vehicle — fuel managed separately.';
      result.isOdd       = result.lastDigit % 2 !== 0;
      return result;
    }

    // 6. Diplomatic
    m = plate.match(this.patterns.diplomatic);
    if (m) {
      result.valid       = true;
      result.format      = 'Diplomatic';
      result.prefix      = m[1];
      result.number      = m[2];
      result.lastDigit   = parseInt(m[2][m[2].length - 1]);
      result.vehicleType = 'other';
      result.note        = 'Diplomatic vehicle.';
      result.isOdd       = result.lastDigit % 2 !== 0;
      return result;
    }

    return {
      ...result,
      valid: false,
      error: `"${plate}" is not a recognised Sri Lanka number plate format.\n\nValid formats: AB-1234 · ABC-1234 · WP CAR 1234 · CAB-5678`
    };
  },

  // ── ODD/EVEN RULE ──────────────────────────────────────────
  getOddEvenStatus(lastDigit, vehicleType) {
    // Motorcycles & three-wheelers were exempt during 2022 crisis
    if (vehicleType === 'motorcycle' || vehicleType === 'threewheeler') {
      return { exempt: true, reason: 'Motorcycles and three-wheelers are exempt from the odd/even rule.' };
    }
    const today     = new Date();
    const dateNum   = today.getDate();
    const todayOdd  = dateNum % 2 !== 0;
    const plateOdd  = lastDigit % 2 !== 0;
    const eligible  = todayOdd === plateOdd;
    return {
      exempt:    false,
      eligible,
      plateOdd,
      todayOdd,
      today:     today.toLocaleDateString('en-LK', { weekday:'long', year:'numeric', month:'long', day:'numeric' }),
      dateNum,
      lastDigit,
      reason:    eligible
        ? `Today is ${dateNum} (${todayOdd ? 'odd' : 'even'} date) and your plate ends in ${lastDigit} (${plateOdd ? 'odd' : 'even'}).`
        : `Today is ${dateNum} (${todayOdd ? 'odd' : 'even'} date) but your plate ends in ${lastDigit} (${plateOdd ? 'odd' : 'even'}).`
    };
  },

  // ── QUOTA LOOKUP ───────────────────────────────────────────
  getQuota(vehicleType) {
    return {
      weekly:    this.quotaLitres[vehicleType] || this.quotaLitres.other,
      fuelType:  this.fuelType[vehicleType]    || 'both',
      label:     this.labels[vehicleType]      || '🚘 Other',
    };
  },

  // ── FULL ELIGIBILITY REPORT ────────────────────────────────
  getEligibilityReport(rawPlate, overrideType = null, usedLitres = 0) {
    const v = this.validate(rawPlate);
    if (!v.valid) return { valid: false, error: v.error };

    // Use detected type or override from user selection
    const vType     = (v.vehicleType === 'unknown' || !v.vehicleType) ? (overrideType || 'car') : v.vehicleType;
    const quota     = this.getQuota(vType);
    const oddEven   = this.getOddEvenStatus(v.lastDigit, vType);
    const remaining = Math.max(0, quota.weekly - (parseFloat(usedLitres) || 0));
    const canFill   = !oddEven.exempt ? (oddEven.eligible && remaining > 0) : remaining > 0;

    return {
      valid:        true,
      plate:        v.raw,
      compact:      v.compact,
      format:       v.format,
      province:     v.province,
      typeCode:     v.typeCode,
      vehicleType:  vType,
      vehicleLabel: quota.label,
      lastDigit:    v.lastDigit,
      isOdd:        v.isOdd,
      fuelType:     quota.fuelType,
      weeklyQuota:  quota.weekly,
      usedLitres:   parseFloat(usedLitres) || 0,
      remaining,
      canFill,
      oddEven,
      note:         v.note || null,
      needsTypeSelection: v.vehicleType === 'unknown',
      // Format display
      displayPlate: v.number ? `${v.prefix || v.typeCode || ''}-${v.number}`.replace(/^-/, '') : v.raw,
    };
  },

  // ── SAMPLE PLATES for testing ──────────────────────────────
  samplePlates: [
    { plate: 'ABC-1234', desc: 'New format (2013+)' },
    { plate: 'AB-5678',  desc: 'New format (2000–2013)' },
    { plate: 'WP CAR 1234', desc: 'Old — Western Province Car' },
    { plate: 'CP MB 4567',  desc: 'Old — Central Province Motorcycle' },
    { plate: 'NP TW 0012',  desc: 'Old — Northern Province Three-Wheeler' },
    { plate: 'CAB-5678',    desc: 'Old — Taxi (no province)' },
    { plate: 'SP BUS 0099', desc: 'Old — Southern Province Bus' },
    { plate: 'WP VAN 3333', desc: 'Old — Western Province Van' },
    { plate: 'SLA-12345',   desc: 'Military (SL Army)' },
  ]
};
