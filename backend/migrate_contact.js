// Creates the contact_messages table on the live Render DB
const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://fuelpass_user:ZkFums1VYMffEH5GaCFY2aiCKtc7NMJv@dpg-d736jtffte5s73esnep0-a.singapore-postgres.render.com/fuelpass_fs60',
  ssl: { rejectUnauthorized: false }
});
async function run() {
  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(200),
      subject     VARCHAR(200)  NOT NULL DEFAULT 'General Enquiry',
      message     TEXT          NOT NULL,
      reply       TEXT,
      replied_at  TIMESTAMP,
      status      VARCHAR(20)   NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new','read','replied')),
      created_at  TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('✅ contact_messages table ready.');
  await client.end();
}
run().catch(e => { console.error(e); client.end(); });
