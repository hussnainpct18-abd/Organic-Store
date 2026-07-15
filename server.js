import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const productsPath = path.join(__dirname, 'products.json');
const uploadsDir = path.join(__dirname, 'public/uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage config: save files to public/uploads with original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.get('/api/products', (req, res) => {
  try {
    const data = fs.readFileSync(productsPath, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const newProduct = req.body;
    products.unshift(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/products', (req, res) => {
  try {
    let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const updatedProduct = req.body;
    products = products.map((p) => p.id === updatedProduct.id ? updatedProduct : p);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const id = parseInt(req.params.id, 10);
    products = products.filter((p) => p.id !== id);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the public URL for the uploaded file
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: imageUrl });
});


// Serve static files in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.log('No dist folder found. Static files will not be served.');
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
