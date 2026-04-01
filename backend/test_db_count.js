const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://fuelpass_db_8l08_user:uW2pREI5uE7K2u1Q6K9vH4Wz0I8I0I9@dpg-cuse830gph6c73e0q0eg-a.oregon-postgres.render.com/fuelpass_db_8l08',
  ssl: { rejectUnauthorized: false }
});

async function check() {
  console.log('🔄 Connecting to live database...');
  await client.connect();
  try {
    const fuel = await client.query("SELECT count(*) FROM stations WHERE id NOT LIKE 'rg%'");
    const gas = await client.query("SELECT count(*) FROM stations WHERE id LIKE 'rg%'");
    console.log('--- DATABASE STATUS REPORT ---');
    console.log('FUEL_STATIONS_IN_DB:', fuel.rows[0].count);
    console.log('GAS_SHOPS_IN_DB:    ', gas.rows[0].count);
    console.log('TOTAL_LOCATIONS:     ', parseInt(fuel.rows[0].count) + parseInt(gas.rows[0].count));
    console.log('------------------------------');
  } catch (err) {
    console.error('❌ Query failed:', err.message);
  } finally {
    await client.end();
  }
}
check();
