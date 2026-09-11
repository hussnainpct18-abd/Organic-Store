import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../models/productModel.js';

function normalizeProduct(product) {
  if (!product) return null;

  return {
    id: Number(product.id),
    name: String(product.name),
    description: String(product.description),
    price: String(product.price),
    category: String(product.category),
    image: String(product.image),
    badge: String(product.badge || 'Organic'),
  };
}

export async function listProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products.map(normalizeProduct));
  } catch (error) {
    console.error('listProducts error:', error);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    return res.json(normalizeProduct(product));
  } catch (error) {
    console.error('getProduct error:', error);
    return res.status(500).json({ error: 'Failed to fetch product.' });
  }
}

export async function createNewProduct(req, res) {
  try {
    const { name, description, price, category, image, badge } = req.body || {};

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ error: 'Missing required product fields.' });
    }

    const product = await createProduct({
      name: String(name).trim(),
      description: String(description).trim(),
      price: String(price).trim(),
      category: String(category).trim(),
      image: String(image).trim(),
      badge: String(badge || 'Organic').trim(),
    });

    return res.status(201).json({ success: true, product: normalizeProduct(product) });
  } catch (error) {
    console.error('createNewProduct error:', error);
    return res.status(500).json({ error: 'Failed to create product.' });
  }
}

export async function updateExistingProduct(req, res) {
  try {
    const id = Number(req.params.id || req.body?.id);
    const { name, description, price, category, image, badge } = req.body || {};

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Valid product id is required.' });
    }

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ error: 'Missing required product fields.' });
    }

    const product = await updateProduct(id, {
      name: String(name).trim(),
      description: String(description).trim(),
      price: String(price).trim(),
      category: String(category).trim(),
      image: String(image).trim(),
      badge: String(badge || 'Organic').trim(),
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    return res.json({ success: true, product: normalizeProduct(product) });
  } catch (error) {
    console.error('updateExistingProduct error:', error);
    return res.status(500).json({ error: 'Failed to update product.' });
  }
}

export async function removeProduct(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Valid product id is required.' });
    }

    const deleted = await deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('removeProduct error:', error);
    return res.status(500).json({ error: 'Failed to delete product.' });
  }
}
