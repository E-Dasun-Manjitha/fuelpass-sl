const { Client } = require('pg');
const { REAL_STATIONS, REAL_GAS_SHOPS } = require('../js/stations_real.js');

process.on('uncaughtException', (err) => {
  console.error("Global crash:", err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error("Unhandled Promise:", reason);
  process.exit(1);
});

const client = new Client({
  connectionString: 'postgres://fuelpass_db_8l08_user:uW2pREI5uE7K2u1Q6K9vH4Wz0I8I0I9@dpg-cuse830gph6c73e0q0eg-a.oregon-postgres.render.com/fuelpass_db_8l08',
  ssl: { rejectUnauthorized: false }
});

const FUEL_STATIONS = REAL_STATIONS;
const GAS_SHOPS = REAL_GAS_SHOPS;

async function seed() {
  await client.connect();
  try {
    await client.query('BEGIN');
    console.log("Cleaning existing data from Oregon DB...");
    await client.query('DELETE FROM station_fuel_status');
    await client.query('DELETE FROM stations');
    
    const allLocations = [...FUEL_STATIONS, ...GAS_SHOPS.map(g => ({...g, company: g.provider, fuels: g.stock}))];
    
    console.log(`Seeding ${allLocations.length} locations in chunks...`);
    
    // Bulk Insert Stations in chunks
    const STATION_CHUNK_SIZE = 100;
    for (let i = 0; i < allLocations.length; i += STATION_CHUNK_SIZE) {
      const chunk = allLocations.slice(i, i + STATION_CHUNK_SIZE);
      const stationValues = [];
      const stationRows = chunk.map((s, idx) => {
        const offset = idx * 8;
        stationValues.push(s.id, s.name, s.company, s.district, s.address, s.lat, s.lng, s.phone);
        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, NOW())`;
      });
      
      await client.query(`
        INSERT INTO stations (id, name, company, district, address, lat, lng, phone, created_at)
        VALUES ${stationRows.join(', ')}
      `, stationValues);
      console.log(`✅ Seeded stations ${i+1} to ${Math.min(i+STATION_CHUNK_SIZE, allLocations.length)}`);
    }

    // Prepare Fuel Statuses
    const statusData = [];
    allLocations.forEach(s => {
      const fuels = s.fuels || {};
      Object.entries(fuels).forEach(([fType, status]) => {
        statusData.push({ id: s.id, type: fType, status, queue: s.queue || 'none' });
      });
    });

    console.log(`Seeding ${statusData.length} fuel status records in chunks of 50...`);
    const STATUS_CHUNK_SIZE = 50;
    for (let i = 0; i < statusData.length; i += STATUS_CHUNK_SIZE) {
      const chunk = statusData.slice(i, i + STATUS_CHUNK_SIZE);
      const statusValues = [];
      const statusRows = chunk.map((st, idx) => {
        const offset = idx * 4;
        statusValues.push(st.id, st.type, st.status, st.queue);
        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, NOW(), 'system')`;
      });

      await client.query(`
        INSERT INTO station_fuel_status (station_id, fuel_type, status, queue, last_updated, updated_by)
        VALUES ${statusRows.join(', ')}
      `, statusValues);
      console.log(`✅ Seeded statuses ${i+1} to ${Math.min(i+STATUS_CHUNK_SIZE, statusData.length)}`);
    }

    await client.query('COMMIT');
    console.log(`✅ Seeding Complete! ${allLocations.length} locations and ${statusData.length} status records added to the national infrastructure.`);
    console.log("READY FOR NATIONAL DEPLOYMENT.");
  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error("❌ Seeding Failed. Rolled back changes.", err);
  } finally {
    await client.end();
  }
}
seed().catch(console.error);
