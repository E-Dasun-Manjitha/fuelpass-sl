const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const res = await client.query(`
    SELECT pg_get_constraintdef(oid) as def
    FROM pg_constraint
    WHERE conname = 'station_fuel_status_status_check'
  `);
  if (res.rows.length) {
    console.log('STATUS_CHECK_DEF:', res.rows[0].def);
  } else {
    console.log('STATUS_CHECK_DEF: NOT FOUND');
  }
  await client.end();
}
go().catch(console.error);
