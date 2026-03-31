const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function check() {
  await client.connect();
  const res = await client.query('SELECT * FROM contact_messages');
  console.log('Count:', res.rowCount);
  console.log('Messages:', res.rows);
  await client.end();
}
check().catch(e => { console.error(e); client.end(); });
