const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'stations'");
  console.log('STATIONS COLS:', res.rows);
  const res2 = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'station_fuel_status'");
  console.log('STATUS COLS:', res2.rows);
  await client.end();
}
go().catch(console.error);
