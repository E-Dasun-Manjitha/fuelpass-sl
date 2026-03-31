const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const station = await client.query("SELECT * FROM stations WHERE name='BANDARIGODA FILLING STATION'");
  console.log(station.rows);
  await client.end();
}
go().catch(console.error);
