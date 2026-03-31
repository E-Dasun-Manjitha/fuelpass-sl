const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  await client.query("DELETE FROM owners WHERE station_code = 'CPC-TRI-203'");
  await client.query("DELETE FROM stations WHERE id = 'cpctri203'");
  console.log("DELETED CPC-TRI-203");
  await client.end();
}
go().catch(console.error);
