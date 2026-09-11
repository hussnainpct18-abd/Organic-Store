import pool from '../config/db.js';

export async function getAllProducts() {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
  return rows;
}

export async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0] || null;
}

export async function createProduct(product) {
  const { name, description, price, category, image, badge } = product;
  const [result] = await pool.query(
    `INSERT INTO products (name, description, price, category, image, badge)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, category, image, badge]
  );

  return getProductById(result.insertId);
}

export async function updateProduct(id, product) {
  const { name, description, price, category, image, badge } = product;
  const [result] = await pool.query(
    `UPDATE products
     SET name = ?, description = ?, price = ?, category = ?, image = ?, badge = ?
     WHERE id = ?`,
    [name, description, price, category, image, badge, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getProductById(id);
}

export async function deleteProduct(id) {
  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
