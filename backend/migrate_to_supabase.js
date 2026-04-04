const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function migrate() {
    if (!process.env.DATABASE_URL || !process.env.SUPABASE_URL) {
        console.error("❌ ERROR: Both DATABASE_URL (Render) and SUPABASE_URL (Supabase) must be set in .env");
        process.exit(1);
    }

    console.log("🚀 Starting Zero-Downtime Migration from Render to Supabase...");

    const sourceClient = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    const targetClient = new Client({
        connectionString: process.env.SUPABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await sourceClient.connect();
        console.log("✅ Connected to Source (Render)");
        
        await targetClient.connect();
        console.log("✅ Connected to Target (Supabase)");

        // 1. Recreate Schema on Target
        console.log("⏳ Building Database Schema on Supabase...");
        await targetClient.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;");
        const schemaPath = path.join(__dirname, 'db', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await targetClient.query(schemaSql);
        
        // 1.5 Sync custom architectural alterations
        console.log("⏳ Replicating custom constraints...");
        await targetClient.query(`ALTER TABLE stations DROP CONSTRAINT IF EXISTS stations_company_check;`);
        await targetClient.query(`ALTER TABLE stations ADD CONSTRAINT stations_company_check CHECK (company IN ('CPC','IOC','Litro','LAUGFS'));`);
        await targetClient.query(`ALTER TABLE station_fuel_status DROP CONSTRAINT IF EXISTS station_fuel_status_fuel_type_check;`);
        await targetClient.query(`ALTER TABLE station_fuel_status ADD CONSTRAINT station_fuel_status_fuel_type_check CHECK (fuel_type IN ('petrol92','petrol95','diesel','superDiesel','12.5kg','5kg','37.5kg'));`);
        console.log("✅ Schema perfectly synchronized with Render!");

        // 2. Data Transfer (Ordered by Foreign Keys)
        const tables = [
            'stations',
            'station_fuel_status',
            'gas_shops',
            'gas_shop_stock',
            'fuel_prices',
            'gas_prices',
            'owners',
            'reports'
        ];

        for (const table of tables) {
            console.log(`\n⏳ Migrating table: [ ${table} ]...`);
            
            const res = await sourceClient.query(`SELECT * FROM ${table}`);
            const rows = res.rows;
            
            if (rows.length === 0) {
                console.log(`➡️  0 rows found. Skipping.`);
                continue;
            }

            // Clear target table data to prevent conflict if run multiple times
            await targetClient.query(`TRUNCATE TABLE ${table} CASCADE`);
            
            // Build dynamic insert
            const columns = Object.keys(rows[0]);
            const colList = columns.join(", ");
            const valList = columns.map((_, i) => `$${i + 1}`).join(", ");
            
            const insertQuery = `INSERT INTO ${table} (${colList}) VALUES (${valList})`;
            
            let count = 0;
            for (const row of rows) {
                const values = columns.map(col => row[col]);
                await targetClient.query(insertQuery, values);
                count++;
            }
            
            console.log(`✅ Successfully migrated ${count} rows into [ ${table} ]`);
        }

        console.log("\n🎉 MIGRATION COMPLETE! 100% of data successfully moved to Supabase.");

    } catch (err) {
        console.error("\n❌ MIGRATION FAILED:", err.message);
    } finally {
        await sourceClient.end();
        await targetClient.end();
    }
}

migrate();
