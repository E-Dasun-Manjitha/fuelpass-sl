const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  console.log('Expanding constraints...');
  try {
    await client.query('ALTER TABLE station_fuel_status DROP CONSTRAINT IF EXISTS station_fuel_status_fuel_type_check');
    await client.query(`
      ALTER TABLE station_fuel_status 
      ADD CONSTRAINT station_fuel_status_fuel_type_check 
      CHECK (fuel_type IN ('petrol92','petrol95','diesel','superDiesel','12.5kg','5kg','37.5kg'))
    `);
    console.log('✅ Success expanding fuel types.');
  } catch(e) {
    console.error('Failed to alter:', e);
  }
  await client.end();
}
go().catch(console.error);
