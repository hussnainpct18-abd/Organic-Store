import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const productsPath = path.join(rootDir, 'backend', 'data', 'products.json');

function readProducts() {
  if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, '[]', 'utf8');
    return [];
  }

  const raw = fs.readFileSync(productsPath, 'utf8');
  const parsed = JSON.parse(raw || '[]');
  return Array.isArray(parsed) ? parsed : [];
}

function writeProducts(products) {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
}

export async function getAllProducts() {
  if (pool) {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    return rows;
  }

  return readProducts().sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
}

export async function getProductById(id) {
  if (pool) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  }

  const products = readProducts();
  return products.find((product) => Number(product.id) === Number(id)) || null;
}

export async function createProduct(product) {
  if (pool) {
    const { name, description, price, category, image, badge } = product;
    const [result] = await pool.query(
      `INSERT INTO products (name, description, price, category, image, badge)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, price, category, image, badge]
    );

    return getProductById(result.insertId);
  }

  const products = readProducts();
  const nextId = products.reduce((max, item) => Math.max(max, Number(item.id || 0)), 0) + 1;
  const nextProduct = {
    id: nextId,
    ...product,
    badge: product.badge || 'Organic',
  };

  products.unshift(nextProduct);
  writeProducts(products);
  return nextProduct;
}

export async function updateProduct(id, product) {
  if (pool) {
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

  const products = readProducts();
  const index = products.findIndex((item) => Number(item.id) === Number(id));

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...product,
    id: Number(id),
    badge: product.badge || products[index].badge || 'Organic',
  };

  writeProducts(products);
  return products[index];
}

export async function deleteProduct(id) {
  if (pool) {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  const products = readProducts();
  const filtered = products.filter((product) => Number(product.id) !== Number(id));

  if (filtered.length === products.length) {
    return false;
  }

  writeProducts(filtered);
  return true;
}
