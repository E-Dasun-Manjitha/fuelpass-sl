const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function go() {
  await client.connect();
  console.log('Expanding stations constraints...');
  try {
    await client.query('ALTER TABLE stations DROP CONSTRAINT IF EXISTS stations_company_check');
    await client.query(`
      ALTER TABLE stations 
      ADD CONSTRAINT stations_company_check 
      CHECK (company IN ('CPC','IOC','Litro','LAUGFS'))
    `);
    console.log('✅ Success expanding companies.');
  } catch(e) {
    console.error('Failed to alter:', e);
  }
  await client.end();
}
go().catch(console.error);
