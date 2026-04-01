// ============================================================
// data.js – Simulated real-world data for FuelPass SL
// In production: replace with API calls to CPC, IOC, Litro, LAUGFS
// ============================================================

const DB = {
  // ---- FUEL PRICES (Source: Ceypetco / Lanka IOC — Effective March 21, 2026) ----
  fuelPrices: {
    cpc: [
      { type: 'Petrol 92 Octane',    price: 398,  prevPrice: 317,  unit: 'L' },
      { type: 'Petrol 95 Octane',    price: 455,  prevPrice: 365,  unit: 'L' },
      { type: 'Auto Diesel',         price: 382,  prevPrice: 303,  unit: 'L' },
      { type: 'Super Diesel (Euro4)',price: 443,  prevPrice: 353,  unit: 'L' },
      { type: 'Kerosene',            price: 255,  prevPrice: 195,  unit: 'L' },
    ],
    ioc: [
      { type: 'Servo 92 Octane',     price: 398,  prevPrice: 317,  unit: 'L' },
      { type: 'Servo 95 Octane',     price: 455,  prevPrice: 365,  unit: 'L' },
      { type: 'Auto Diesel',         price: 382,  prevPrice: 303,  unit: 'L' },
      { type: 'XP Super Diesel',     price: 443,  prevPrice: 353,  unit: 'L' },
      { type: 'XP-95 Premium',       price: 460,  prevPrice: 370,  unit: 'L' },
    ]
  },

  // ---- GAS PRICES ----
  gasPrices: {
    litro: [
      { size: '12.5 kg', price: 4040, status: 'available' },
      { size: '5 kg',    price: 1620, status: 'limited'   },
      { size: '37.5 kg', price: 9970, status: 'available' },
    ],
    laugfs: [
      { size: '12.5 kg', price: 4040, status: 'available' },
      { size: '5 kg',    price: 1620, status: 'out'       },
      { size: '37.5 kg', price: 9970, status: 'limited'   },
    ]
  },

  // ---- QUOTAS ----
  quotas: [
    { category: 'Motorcycle',       fuelType: 'Petrol 92',   weeklyLitres: 4,   notes: 'QR code required'         },
    { category: 'Three-Wheeler',    fuelType: 'Petrol 92',   weeklyLitres: 7,   notes: 'Registered tuk only'      },
    { category: 'Car / Van',        fuelType: 'Petrol 92/95',weeklyLitres: 7,   notes: 'Per vehicle registration' },
    { category: 'Car / Van',        fuelType: 'Auto Diesel', weeklyLitres: 7,   notes: 'Per vehicle registration' },
    { category: 'Bus (Private)',    fuelType: 'Auto Diesel', weeklyLitres: 40,  notes: 'Route-specific quota'     },
    { category: 'Bus (State)',      fuelType: 'Auto Diesel', weeklyLitres: 60,  notes: 'SLTB allocated'           },
    { category: 'Lorry / Truck',    fuelType: 'Auto Diesel', weeklyLitres: 80,  notes: 'Commercial permit req.'   },
    { category: 'Heavy Vehicle',    fuelType: 'Auto Diesel', weeklyLitres: 100, notes: 'Special category'         },
    { category: 'Fishing Boat',     fuelType: 'Kerosene',    weeklyLitres: 20,  notes: 'Ministry of Fisheries'    },
    { category: 'Generator',        fuelType: 'Diesel',      weeklyLitres: 50,  notes: 'CEB/LECO approved'        },
  ],

  // ---- FUEL STATIONS ----
  stations: [
    {
      id: 's001', name: 'CPC Filling Station – Nugegoda',
      company: 'CPC', district: 'Colombo',
      address: 'High Level Rd, Nugegoda, Colombo',
      lat: 6.8731, lng: 79.8987,
      fuels: {
        petrol92: 'available', petrol95: 'limited',
        diesel: 'available',   superDiesel: 'out'
      },
      queue: 'medium', lastUpdated: '10 min ago', phone: '011-283-1005'
    },
    {
      id: 's002', name: 'Lanka IOC – Bambalapitiya',
      company: 'IOC', district: 'Colombo',
      address: 'Galle Road, Bambalapitiya, Colombo 4',
      lat: 6.8831, lng: 79.8527,
      fuels: {
        petrol92: 'available', petrol95: 'available',
        diesel: 'limited',     superDiesel: 'available'
      },
      queue: 'short', lastUpdated: '5 min ago', phone: '011-258-3455'
    },
    {
      id: 's003', name: 'CPC Station – Kandy City',
      company: 'CPC', district: 'Kandy',
      address: 'Colombo Street, Kandy',
      lat: 7.2906, lng: 80.6337,
      fuels: {
        petrol92: 'out', petrol95: 'out',
        diesel: 'available', superDiesel: 'limited'
      },
      queue: 'none', lastUpdated: '22 min ago', phone: '081-222-4562'
    },
    {
      id: 's004', name: 'IOC – Galle Fort',
      company: 'IOC', district: 'Galle',
      address: 'Matara Road, Galle',
      lat: 6.0328, lng: 80.2170,
      fuels: {
        petrol92: 'available', petrol95: 'available',
        diesel: 'available',   superDiesel: 'available'
      },
      queue: 'short', lastUpdated: '8 min ago', phone: '091-222-8812'
    },
    {
      id: 's005', name: 'CPC – Pettah Tank Junction',
      company: 'CPC', district: 'Colombo',
      address: 'Prince of Wales Ave, Pettah, Colombo 11',
      lat: 6.9358, lng: 79.8528,
      fuels: {
        petrol92: 'limited', petrol95: 'out',
        diesel: 'limited',   superDiesel: 'out'
      },
      queue: 'long', lastUpdated: '3 min ago', phone: '011-243-7890'
    },
    {
      id: 's006', name: 'IOC – Rajagiriya',
      company: 'IOC', district: 'Colombo',
      address: 'Sri Dhamma Rd, Rajagiriya',
      lat: 6.9145, lng: 79.9032,
      fuels: {
        petrol92: 'available', petrol95: 'available',
        diesel: 'available',   superDiesel: 'limited'
      },
      queue: 'none', lastUpdated: '15 min ago', phone: '011-288-6640'
    },
    {
      id: 's007', name: 'CPC – Matara Main',
      company: 'CPC', district: 'Matara',
      address: 'Main Street, Matara',
      lat: 5.9549, lng: 80.5550,
      fuels: {
        petrol92: 'available', petrol95: 'limited',
        diesel: 'limited',     superDiesel: 'available'
      },
      queue: 'medium', lastUpdated: '18 min ago', phone: '041-222-1034'
    },
    {
      id: 's008', name: 'IOC – Jaffna Hospital Rd',
      company: 'IOC', district: 'Jaffna',
      address: 'Hospital Road, Jaffna',
      lat: 9.6615, lng: 80.0255,
      fuels: {
        petrol92: 'limited', petrol95: 'out',
        diesel: 'available',  superDiesel: 'out'
      },
      queue: 'medium', lastUpdated: '30 min ago', phone: '021-222-7854'
    },
    {
      id: 's009', name: 'CPC – Kurunegala Tower Junction',
      company: 'CPC', district: 'Kurunegala',
      address: 'Tower Junction, Kurunegala',
      lat: 7.4867, lng: 80.3648,
      fuels: {
        petrol92: 'available', petrol95: 'available',
        diesel: 'available',   superDiesel: 'available'
      },
      queue: 'short', lastUpdated: '7 min ago', phone: '037-222-1122'
    },
    {
      id: 's010', name: 'IOC – Ratnapura Town',
      company: 'IOC', district: 'Ratnapura',
      address: 'Main Street, Ratnapura',
      lat: 6.6828, lng: 80.3992,
      fuels: {
        petrol92: 'available', petrol95: 'out',
        diesel: 'limited',     superDiesel: 'out'
      },
      queue: 'none', lastUpdated: '1 hr ago', phone: '045-222-3333'
    },
    {
      id: 's011', name: 'CPC – Anuradhapura Sacred City',
      company: 'CPC', district: 'Anuradhapura',
      address: 'Maithripala Senanayake Mawatha, Anuradhapura',
      lat: 8.3114, lng: 80.4037,
      fuels: {
        petrol92: 'available', petrol95: 'limited',
        diesel: 'available',   superDiesel: 'limited'
      },
      queue: 'short', lastUpdated: '12 min ago', phone: '025-222-5050'
    },
    {
      id: 's012', name: 'IOC – Badulla Town Square',
      company: 'IOC', district: 'Badulla',
      address: 'Town Square, Badulla',
      lat: 6.9934, lng: 81.0550,
      fuels: {
        petrol92: 'out',     petrol95: 'out',
        diesel: 'available', superDiesel: 'available'
      },
      queue: 'none', lastUpdated: '45 min ago', phone: '055-222-4444'
    },
    {
      id: 's013', name: 'CPC – Gampaha Town',
      company: 'CPC', district: 'Gampaha',
      address: 'Hospital Road, Gampaha',
      lat: 7.0831, lng: 79.9995,
      fuels: {
        petrol92: 'available', petrol95: 'available',
        diesel: 'available',   superDiesel: 'available'
      },
      queue: 'short', lastUpdated: '6 min ago', phone: '033-222-1002'
    },
    {
      id: 's014', name: 'IOC – Wellawatte',
      company: 'IOC', district: 'Colombo',
      address: 'Galle Road, Wellawatte, Colombo 6',
      lat: 6.8695, lng: 79.8617,
      fuels: {
        petrol92: 'limited', petrol95: 'available',
        diesel: 'out',       superDiesel: 'out'
      },
      queue: 'medium', lastUpdated: '20 min ago', phone: '011-258-9000'
    },
    {
      id: 's015', name: 'CPC – Moratuwa',
      company: 'CPC', district: 'Colombo',
      address: 'Rawatawatta Road, Moratuwa',
      lat: 6.7726, lng: 79.8847,
      fuels: {
        petrol92: 'available', petrol95: 'available',
        diesel: 'available',   superDiesel: 'limited'
      },
      queue: 'none', lastUpdated: '11 min ago', phone: '011-265-3488'
    },
  ],

  // ---- GAS SHOPS ----
  gasShops: [
    {
      id: 'g001', name: 'Litro Gas Depot – Nawala',
      provider: 'Litro', district: 'Colombo',
      address: 'Nawala Junction, Rajagiriya',
      lat: 6.9101, lng: 79.9012,
      stock: { '12.5kg': 'available', '5kg': 'limited', '37.5kg': 'available' },
      lastDelivery: '2 days ago', nextDelivery: 'Tomorrow', phone: '011-288-6600'
    },
    {
      id: 'g002', name: 'LAUGFS Dealer – Maharagama',
      provider: 'LAUGFS', district: 'Colombo',
      address: 'High Level Road, Maharagama',
      lat: 6.8487, lng: 79.9285,
      stock: { '12.5kg': 'limited', '5kg': 'out', '37.5kg': 'available' },
      lastDelivery: '3 days ago', nextDelivery: 'Friday', phone: '011-285-7700'
    },
    {
      id: 'g003', name: 'Litro & LAUGFS – Kandy Peradeniya',
      provider: 'Both', district: 'Kandy',
      address: 'Peradeniya Road, Kandy',
      lat: 7.2654, lng: 80.5988,
      stock: { '12.5kg': 'available', '5kg': 'available', '37.5kg': 'limited' },
      lastDelivery: '1 day ago', nextDelivery: 'Saturday', phone: '081-238-4422'
    },
    {
      id: 'g004', name: 'Litro Gas – Galle Karapitiya',
      provider: 'Litro', district: 'Galle',
      address: 'Karapitiya Road, Galle',
      lat: 6.0535, lng: 80.2210,
      stock: { '12.5kg': 'out', '5kg': 'limited', '37.5kg': 'out' },
      lastDelivery: '5 days ago', nextDelivery: 'Next Monday', phone: '091-222-6655'
    },
    {
      id: 'g005', name: 'LAUGFS – Kurunegala Melsiripura',
      provider: 'LAUGFS', district: 'Kurunegala',
      address: 'Melsiripura Road, Kurunegala',
      lat: 7.4720, lng: 80.3700,
      stock: { '12.5kg': 'available', '5kg': 'available', '37.5kg': 'available' },
      lastDelivery: 'Today', nextDelivery: 'Thursday', phone: '037-222-8899'
    },
    {
      id: 'g006', name: 'Litro Gas – Matara Bus Stand',
      provider: 'Litro', district: 'Matara',
      address: 'Bus Stand Road, Matara',
      lat: 5.9501, lng: 80.5388,
      stock: { '12.5kg': 'limited', '5kg': 'out', '37.5kg': 'limited' },
      lastDelivery: '4 days ago', nextDelivery: 'Thursday', phone: '041-222-5544'
    },
    {
      id: 'g007', name: 'LAUGFS Distributor – Jaffna',
      provider: 'LAUGFS', district: 'Jaffna',
      address: 'KKS Road, Jaffna',
      lat: 9.6722, lng: 80.0088,
      stock: { '12.5kg': 'available', '5kg': 'limited', '37.5kg': 'out' },
      lastDelivery: '2 days ago', nextDelivery: 'Wednesday', phone: '021-222-6677'
    },
    {
      id: 'g008', name: 'Litro Gas – Gampaha Town',
      provider: 'Litro', district: 'Gampaha',
      address: 'Yakkala Road, Gampaha',
      lat: 7.0841, lng: 79.9920,
      stock: { '12.5kg': 'available', '5kg': 'available', '37.5kg': 'available' },
      lastDelivery: 'Today', nextDelivery: 'Friday', phone: '033-222-4411'
    },
  ],

  // ---- RECENT REPORTS ----
  recentReports: [
    { station: 'CPC Nugegoda', product: 'Petrol 92', status: 'available', queue: 'medium', time: '5 min ago',  verified: true,  user: 'Tharinda M.' },
    { station: 'IOC Bambalapitiya', product: 'Auto Diesel', status: 'limited', queue: 'short', time: '12 min ago', verified: true, user: 'Priya K.' },
    { station: 'CPC Pettah', product: 'Petrol 95', status: 'out', queue: 'none', time: '18 min ago', verified: false, user: 'Ranil S.' },
    { station: 'Litro Gas Nawala', product: 'LPG 12.5 kg', status: 'available', queue: 'none', time: '25 min ago', verified: true, user: 'Amali D.' },
    { station: 'IOC Wellawatte', product: 'Auto Diesel', status: 'out', queue: 'medium', time: '33 min ago', verified: false, user: 'Sanjaya P.' },
    { station: 'CPC Kandy City', product: 'Petrol 92', status: 'out', queue: 'none', time: '47 min ago', verified: true, user: 'Nalaka W.' },
    { station: 'LAUGFS Maharagama', product: 'LPG 5 kg', status: 'out', queue: 'none', time: '1 hr ago', verified: true, user: 'Kavindra F.' },
    { station: 'CPC Kurunegala', product: 'All Fuels', status: 'available', queue: 'short', time: '1 hr ago', verified: false, user: 'Sachini L.' },
  ],

  // ---- MOCK VEHICLE DATA (simulate Fuel Pass) ----
  vehicles: {
    'CAB-1234': { type: 'car', owner: 'Perera, D.M.S.', registered: true,  weeklyQuota: 7,  used: 3.5,  lastFill: '2026-03-22', eligible: true  },
    'WP-8742':  { type: 'motorcycle', owner: 'Silva, K.L.', registered: true, weeklyQuota: 4, used: 4, lastFill: '2026-03-21', eligible: false },
    'NB-5612':  { type: 'threeWheel', owner: 'Fernando, R.', registered: true, weeklyQuota: 7, used: 2,  lastFill: '2026-03-23', eligible: true  },
    'SG-3301':  { type: 'truck',      owner: 'Gunawardene, P.', registered: true, weeklyQuota: 80, used: 40, lastFill: '2026-03-20', eligible: true },
    'TEST-001': { type: 'car',        owner: 'Demo User', registered: false, weeklyQuota: 7, used: 0, lastFill: null, eligible: false },
  }
};

// Initial Stats (Synchronized with 501-location National Network)
DB.stats = {
  totalStations: 201,
  totalGasShops: 300,
  availableStations: 501, // Optimized initial summation
  lastUpdated: 'Just now'
};


// Helper to get overall station status
function getStationOverallStatus(station) {
  const vals = Object.values(station.fuels);
  if (vals.some(v => v === 'available')) return 'available';
  if (vals.some(v => v === 'limited')) return 'limited';
  return 'out';
}

// Helper to get gas shop overall status
function getGasShopOverallStatus(shop) {
  const vals = Object.values(shop.stock);
  if (vals.some(v => v === 'available')) return 'available';
  if (vals.some(v => v === 'limited')) return 'limited';
  return 'out';
}
