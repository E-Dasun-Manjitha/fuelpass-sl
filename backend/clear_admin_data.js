// ============================================================
// clear_admin_data.js
// Deletes all admin-created owners, stations, and gas shops
// from the live PostgreSQL database (Render).
// Seed prices and gas prices are kept intact.
// ============================================================
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});

async function clearAdminData() {
  await client.connect();
  console.log('Connected to DB');

  // Show what we are about to delete
  const owners    = await client.query('SELECT id, station_code, owner_name FROM owners');
  const stations  = await client.query('SELECT id, name FROM stations');
  const gasShops  = await client.query('SELECT id, name FROM gas_shops');
  const reports   = await client.query('SELECT id, station_name, verified FROM reports');

  console.log('\n=== Current Data ===');
  console.log(`Owners (${owners.rows.length}):`,    owners.rows.map(r => `${r.id}: ${r.station_code} – ${r.owner_name}`));
  console.log(`Stations (${stations.rows.length}):`, stations.rows.map(r => `${r.id}: ${r.name}`));
  console.log(`Gas Shops (${gasShops.rows.length}):`,gasShops.rows.map(r => `${r.id}: ${r.name}`));
  console.log(`Reports (${reports.rows.length}):`,   reports.rows.map(r => `${r.id}: ${r.station_name} verified=${r.verified}`));

  console.log('\n⚠️  Deleting all admin-created data...');

  // 1. Delete all reports (both verified and unverified)
  const r1 = await client.query('DELETE FROM reports');
  console.log(`✅ Deleted ${r1.rowCount} reports`);

  // 2. Delete all owners (unlocks the station FK constraint)
  const r2 = await client.query('DELETE FROM owners');
  console.log(`✅ Deleted ${r2.rowCount} owners`);

  // 3. Delete station fuel statuses (FK child of stations)
  const r3 = await client.query('DELETE FROM station_fuel_status');
  console.log(`✅ Deleted ${r3.rowCount} station fuel status rows`);

  // 4. Delete all admin-created stations
  const r4 = await client.query('DELETE FROM stations');
  console.log(`✅ Deleted ${r4.rowCount} stations`);

  // 5. Delete gas shop stock status rows (FK child of gas_shops)
  const r5 = await client.query('DELETE FROM gas_shop_stock');
  console.log(`✅ Deleted ${r5.rowCount} gas shop stock rows`);

  // 6. Delete all admin-created gas shops
  const r6 = await client.query('DELETE FROM gas_shops');
  console.log(`✅ Deleted ${r6.rowCount} gas shops`);

  console.log('\n✅ All admin-created data cleared. Seed prices kept intact.');
  console.log('DB is now clean and ready for fresh testing.');

  await client.end();
}

clearAdminData().catch(e => { console.error(e); client.end(); });
