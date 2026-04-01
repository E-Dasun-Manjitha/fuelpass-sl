const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const res = await client.query("SELECT * FROM information_schema.columns WHERE table_name = 'stations'");
  console.log('STATIONS:', JSON.stringify(res.rows.map(r => ({col: r.column_name, type: r.data_type})), null, 2));
  const res2 = await client.query("SELECT * FROM information_schema.columns WHERE table_name = 'station_fuel_status'");
  console.log('STATUS:', JSON.stringify(res2.rows.map(r => ({col: r.column_name, type: r.data_type})), null, 2));
  await client.end();
}
go().catch(console.error);
