import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const productsPath = path.join(rootDir, 'products.json');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'organic_products',
  connectionLimit: 5,
});

async function migrateProducts() {
  const rawData = fs.readFileSync(productsPath, 'utf-8');
  const products = JSON.parse(rawData);

  if (!Array.isArray(products)) {
    throw new Error('products.json does not contain a valid array of products.');
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      badge VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_category (category),
      KEY idx_name (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  let inserted = 0;
  let updated = 0;
  let failed = [];

  for (const product of products) {
    try {
      const id = Number(product.id || 0);
      const name = String(product.name || '').trim();
      const description = String(product.description || '').trim();
      const price = String(product.price || '').trim();
      const category = String(product.category || '').trim();
      const image = String(product.image || '').trim();
      const badge = String(product.badge || 'Organic').trim();

      if (!name || !description || !price || !category || !image) {
        throw new Error(`Missing required product fields for product ${JSON.stringify(product)}`);
      }

      const query = `
        INSERT INTO products (id, name, description, price, category, image, badge)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          price = VALUES(price),
          category = VALUES(category),
          image = VALUES(image),
          badge = VALUES(badge),
          updated_at = CURRENT_TIMESTAMP
      `;

      await pool.query(query, [id || null, name, description, price, category, image, badge]);
      if (id) {
        const [rows] = await pool.query('SELECT id FROM products WHERE id = ?', [id]);
        if (rows.length) {
          updated += 1;
        }
      }
      inserted += 1;
    } catch (error) {
      failed.push({ product, error: error.message });
    }
  }

  console.log(`Migration complete.`);
  console.log(`Inserted/updated records: ${inserted}`);
  console.log(`Failed records: ${failed.length}`);

  if (failed.length) {
    console.error(JSON.stringify(failed, null, 2));
    process.exitCode = 1;
  }

  await pool.end();
}

migrateProducts().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
