const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const stations = await client.query('SELECT id, name, company FROM stations ORDER BY created_at DESC LIMIT 5');
  console.log("RECENT STATIONS: ", stations.rows);
  const owners = await client.query('SELECT id, station_code, station_name FROM owners ORDER BY created_at DESC LIMIT 5');
  console.log("RECENT OWNERS: ", owners.rows);
  await client.end();
}
go().catch(console.error);
