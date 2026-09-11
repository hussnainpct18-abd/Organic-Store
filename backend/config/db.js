import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'organics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

export async function initializeDatabase() {
  const createProductsTable = `
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
  `;

  try {
    await pool.query(createProductsTable);

    const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM products');
    const total = Number(countRows[0]?.total || 0);

    if (total === 0) {
      const seedPath = path.resolve(process.cwd(), 'products.json');
      let rawProducts = '[]';

      try {
        rawProducts = fs.readFileSync(seedPath, 'utf8');
      } catch (error) {
        console.warn('No default products.json file found. Skipping seed import.');
      }

      const parsed = JSON.parse(rawProducts || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        for (const product of parsed) {
          await pool.query(
            `INSERT INTO products (id, name, description, price, category, image, badge)
             VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               description = VALUES(description),
               price = VALUES(price),
               category = VALUES(category),
               image = VALUES(image),
               badge = VALUES(badge)`,
            [
              Number(product.id || 0) || null,
              String(product.name || '').trim(),
              String(product.description || '').trim(),
              String(product.price || '').trim(),
              String(product.category || '').trim(),
              String(product.image || '').trim(),
              String(product.badge || 'Organic').trim(),
            ]
          );
        }
      }
    }

    console.log('MySQL database initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize MySQL database:', error.message);
    throw error;
  }
}

export default pool;
