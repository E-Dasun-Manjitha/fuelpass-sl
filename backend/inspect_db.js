const fs = require('fs');
require('dotenv').config({path: '.env'});
const db = require('./db');

async function test() {
  try {
    const fuel = await db.query('SELECT * FROM fuel_prices');
    const gas = await db.query('SELECT * FROM gas_prices');
    const output = JSON.stringify({ fuel: fuel.rows, gas: gas.rows }, null, 2);
    fs.writeFileSync('db_dump.json', output, 'utf8');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

test();
