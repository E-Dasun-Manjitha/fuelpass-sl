const fs = require('fs');
require('dotenv').config({path: '.env'});
const db = require('./db');

async function test() {
  try {
    const stations = await db.query('SELECT id, name FROM stations LIMIT 5');
    const gas = await db.query('SELECT id, name FROM gas_shops LIMIT 5');
    console.log('Stations sample:', stations.rows);
    console.log('Gas shops sample:', gas.rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

test();
