-- ============================================================
-- FuelPass SL – PostgreSQL Schema + Seed Data
-- Run this once to set up the database
-- ============================================================

-- ---- FUEL STATIONS ----
CREATE TABLE IF NOT EXISTS stations (
  id          VARCHAR(20) PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  company     VARCHAR(20)  NOT NULL,
  district    VARCHAR(50)  NOT NULL,
  address     TEXT         NOT NULL,
  lat         DECIMAL(9,6) NOT NULL,
  lng         DECIMAL(9,6) NOT NULL,
  phone       VARCHAR(20),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS station_fuel_status (
  station_id    VARCHAR(20) REFERENCES stations(id) ON DELETE CASCADE,
  fuel_type     VARCHAR(20) NOT NULL CHECK (fuel_type IN ('petrol92','petrol95','diesel','superDiesel')),
  status        VARCHAR(10) NOT NULL DEFAULT 'available' CHECK (status IN ('available','limited','out')),
  queue         VARCHAR(10) NOT NULL DEFAULT 'none'      CHECK (queue  IN ('none','short','medium','long')),
  last_updated  TIMESTAMP DEFAULT NOW(),
  updated_by    VARCHAR(50),
  PRIMARY KEY (station_id, fuel_type)
);

-- ---- GAS SHOPS ----
CREATE TABLE IF NOT EXISTS gas_shops (
  id             VARCHAR(20) PRIMARY KEY,
  name           VARCHAR(200) NOT NULL,
  provider       VARCHAR(20)  NOT NULL CHECK (provider IN ('Litro','LAUGFS','Both')),
  district       VARCHAR(50)  NOT NULL,
  address        TEXT         NOT NULL,
  lat            DECIMAL(9,6) NOT NULL,
  lng            DECIMAL(9,6) NOT NULL,
  phone          VARCHAR(20),
  last_delivery  VARCHAR(50),
  next_delivery  VARCHAR(50),
  created_at     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gas_shop_stock (
  shop_id        VARCHAR(20) REFERENCES gas_shops(id) ON DELETE CASCADE,
  cylinder_size  VARCHAR(10) NOT NULL CHECK (cylinder_size IN ('5kg','12.5kg','37.5kg')),
  status         VARCHAR(10) NOT NULL DEFAULT 'available' CHECK (status IN ('available','limited','out')),
  last_updated   TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (shop_id, cylinder_size)
);

-- ---- FUEL PRICES ----
CREATE TABLE IF NOT EXISTS fuel_prices (
  id          SERIAL PRIMARY KEY,
  provider    VARCHAR(10) NOT NULL CHECK (provider IN ('CPC','IOC')),
  fuel_type   VARCHAR(100) NOT NULL,
  price       INTEGER NOT NULL,
  prev_price  INTEGER NOT NULL,
  unit        VARCHAR(5) NOT NULL DEFAULT 'L',
  effective   DATE DEFAULT CURRENT_DATE,
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ---- GAS PRICES ----
CREATE TABLE IF NOT EXISTS gas_prices (
  id          SERIAL PRIMARY KEY,
  provider    VARCHAR(10) NOT NULL CHECK (provider IN ('Litro','LAUGFS')),
  size        VARCHAR(10) NOT NULL,
  price       INTEGER NOT NULL,
  status      VARCHAR(10) NOT NULL DEFAULT 'available',
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ---- OWNERS ----
CREATE TABLE IF NOT EXISTS owners (
  id            SERIAL PRIMARY KEY,
  station_id    VARCHAR(20) REFERENCES stations(id),
  station_name  VARCHAR(200),
  station_code  VARCHAR(30) UNIQUE NOT NULL,
  owner_name    VARCHAR(150) NOT NULL,
  email         VARCHAR(200),
  mobile        VARCHAR(20),
  password_hash TEXT         NOT NULL,
  approved      BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- ---- REPORTS ----
CREATE TABLE IF NOT EXISTS reports (
  id            SERIAL PRIMARY KEY,
  station_name  VARCHAR(200) NOT NULL,
  product       VARCHAR(50),
  status        VARCHAR(10) CHECK (status IN ('available','limited','out')),
  queue         VARCHAR(10),
  notes         TEXT,
  verified      BOOLEAN DEFAULT FALSE,
  reporter      VARCHAR(100) DEFAULT 'Anonymous',
  station_code  VARCHAR(30),
  created_at    TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Fuel Prices (CPC)
INSERT INTO fuel_prices (provider, fuel_type, price, prev_price, unit) VALUES
  ('CPC', 'Petrol 92 Octane',     398, 317, 'L'),
  ('CPC', 'Petrol 95 Octane',     455, 365, 'L'),
  ('CPC', 'Auto Diesel',          382, 303, 'L'),
  ('CPC', 'Super Diesel (Euro4)', 443, 353, 'L'),
  ('CPC', 'Kerosene',             255, 195, 'L')
ON CONFLICT DO NOTHING;

-- Fuel Prices (IOC)
INSERT INTO fuel_prices (provider, fuel_type, price, prev_price, unit) VALUES
  ('IOC', 'Servo 92 Octane',  398, 317, 'L'),
  ('IOC', 'Servo 95 Octane',  455, 365, 'L'),
  ('IOC', 'Auto Diesel',      382, 303, 'L'),
  ('IOC', 'XP Super Diesel',  443, 353, 'L'),
  ('IOC', 'XP-95 Premium',    460, 370, 'L')
ON CONFLICT DO NOTHING;

-- Gas Prices
INSERT INTO gas_prices (provider, size, price, status) VALUES
  ('Litro',  '12.5 kg', 4040, 'available'),
  ('Litro',  '5 kg',    1620, 'limited'),
  ('Litro',  '37.5 kg', 9970, 'available'),
  ('LAUGFS', '12.5 kg', 4040, 'available'),
  ('LAUGFS', '5 kg',    1620, 'out'),
  ('LAUGFS', '37.5 kg', 9970, 'limited')
ON CONFLICT DO NOTHING;

-- Sample stations (Colombo)
INSERT INTO stations (id, name, company, district, address, lat, lng, phone) VALUES
  ('r001','CPC Filling Station – Pettah',   'CPC','Colombo','Prince of Wales Ave, Pettah, Colombo 11',6.9358,79.8528,'011-243-7890'),
  ('r002','Lanka IOC – Bambalapitiya',       'IOC','Colombo','Galle Rd, Bambalapitiya, Colombo 4',     6.8831,79.8527,'011-258-3455'),
  ('r003','CPC Filling Station – Nugegoda', 'CPC','Colombo','High Level Rd, Nugegoda, Colombo',        6.8731,79.8987,'011-283-1005'),
  ('r004','Lanka IOC – Wellawatte',          'IOC','Colombo','Galle Rd, Wellawatte, Colombo 6',         6.8695,79.8617,'011-258-9000'),
  ('r005','CPC – Rajagiriya',               'CPC','Colombo','Sri Dhamma Mawatha, Rajagiriya',          6.9145,79.9032,'011-288-6640'),
  ('r021','CPC – Kandy City Centre',        'CPC','Kandy',  'Colombo St, Kandy',                       7.2906,80.6337,'081-222-4562'),
  ('r029','CPC – Galle Fort Rd',            'CPC','Galle',  'Matara Rd, Galle',                        6.0328,80.2170,'091-222-8812')
ON CONFLICT (id) DO NOTHING;

-- Seed fuel status for stations
INSERT INTO station_fuel_status (station_id, fuel_type, status, queue) VALUES
  ('r001','petrol92','available','medium'),('r001','petrol95','available','medium'),
  ('r001','diesel','available','medium'),  ('r001','superDiesel','limited','medium'),
  ('r002','petrol92','available','short'), ('r002','petrol95','available','short'),
  ('r002','diesel','available','short'),   ('r002','superDiesel','available','short'),
  ('r003','petrol92','available','medium'),('r003','petrol95','limited','medium'),
  ('r003','diesel','available','medium'),  ('r003','superDiesel','out','medium'),
  ('r004','petrol92','available','short'), ('r004','petrol95','available','short'),
  ('r004','diesel','available','short'),   ('r004','superDiesel','limited','short'),
  ('r005','petrol92','available','none'),  ('r005','petrol95','available','none'),
  ('r005','diesel','available','none'),    ('r005','superDiesel','available','none'),
  ('r021','petrol92','available','medium'),('r021','petrol95','available','medium'),
  ('r021','diesel','available','medium'),  ('r021','superDiesel','limited','medium'),
  ('r029','petrol92','available','short'), ('r029','petrol95','available','short'),
  ('r029','diesel','available','short'),   ('r029','superDiesel','available','short')
ON CONFLICT (station_id, fuel_type) DO NOTHING;

-- Sample gas shops
INSERT INTO gas_shops (id, name, provider, district, address, lat, lng, phone, last_delivery, next_delivery) VALUES
  ('rg001','Litro Gas Depot – Nawala', 'Litro', 'Colombo','Nawala Junction, Rajagiriya',6.9101,79.9012,'011-288-6600','2 days ago','Tomorrow'),
  ('rg002','LAUGFS Gas – Maharagama', 'LAUGFS','Colombo','High Level Rd, Maharagama',  6.8487,79.9285,'011-285-7700','3 days ago','Friday')
ON CONFLICT (id) DO NOTHING;

INSERT INTO gas_shop_stock (shop_id, cylinder_size, status) VALUES
  ('rg001','12.5kg','available'),('rg001','5kg','limited'),('rg001','37.5kg','available'),
  ('rg002','12.5kg','limited'),  ('rg002','5kg','out'),    ('rg002','37.5kg','available')
ON CONFLICT (shop_id, cylinder_size) DO NOTHING;
