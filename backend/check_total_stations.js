const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const stations = await client.query('SELECT count(*) FROM stations');
  console.log("TOTAL STATIONS: ", stations.rows[0].count);
  const sample = await client.query('SELECT id, name, district FROM stations LIMIT 5');
  console.log("SAMPLE: ", sample.rows);
  await client.end();
}
go().catch(console.error);
