const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  const res = await client.query("SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'stations' AND column_name = 'id'");
  if (res.rows.length) {
    console.log('ID_COLINFO:', res.rows[0].column_name, '|', res.rows[0].data_type, '|', res.rows[0].column_default);
  } else {
    console.log('ID_COLINFO: NOT FOUND');
  }
  await client.end();
}
go().catch(console.error);
