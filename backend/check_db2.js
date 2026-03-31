const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const owners = await client.query('SELECT station_code, email, password_hash FROM owners');
  console.log("OWNERS: ", owners.rows);
  await client.end();
}
go().catch(console.error);
