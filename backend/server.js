import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import productRoutes from './routes/productRoutes.js';
import { initializeDatabase } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = Number(process.env.PORT || 3001);
const uploadsDir = path.join(rootDir, 'backend', 'uploads');
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'change-me';
const adminToken = process.env.ADMIN_TOKEN || 'al-shahid-organics-admin-token';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const allowedOrigins = [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173', 'https://*.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some((entry) => entry === origin || entry === '*')) {
      return callback(null, true);
    }

    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error('CORS not allowed'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.use('/uploads', express.static(uploadsDir));

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const incomingEmail = String(email).trim().toLowerCase();
  const incomingPassword = String(password);

  if (incomingEmail !== String(adminEmail).trim().toLowerCase() || incomingPassword !== adminPassword) {
    return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
  }

  return res.json({ success: true, token: adminToken, email: adminEmail });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  return res.json({ success: true, url: imageUrl });
});

app.use('/api/products', productRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is healthy.' });
});

const distPath = path.join(rootDir, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

if (process.env.VERCEL !== '1') {
  initializeDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Unable to start backend:', error.message);
      process.exit(1);
    });
} else {
  initializeDatabase().catch((error) => {
    console.error('Database initialization failed:', error.message);
  });
}

export default app;
