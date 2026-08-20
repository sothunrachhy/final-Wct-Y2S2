import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = 'postgresql://neondb_owner:npg_xiTR0L1wUlnj@ep-hidden-grass-azffnuf8-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('Connecting to Neon Cloud PostgreSQL Database...');
  const client = await pool.connect();
  console.log('Connected successfully!');

  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  const seedPath = path.join(__dirname, '..', 'db', 'seed.sql');

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  console.log('Executing schema.sql...');
  await client.query(schemaSql);
  console.log('Schema created successfully!');

  console.log('Executing seed.sql...');
  await client.query(seedSql);
  console.log('Seed data inserted successfully!');

  const res = await client.query('SELECT COUNT(*) FROM recipes');
  console.log(`Total recipes in Neon PostgreSQL: ${res.rows[0].count}`);

  client.release();
  await pool.end();
}

main().catch((err) => {
  console.error('Error migrating Neon database:', err);
  process.exit(1);
});
