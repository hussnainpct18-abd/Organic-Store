import express from 'express';
import {
  listProducts,
  getProduct,
  createNewProduct,
  updateExistingProduct,
  removeProduct,
} from '../controllers/productController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAdminAuth, createNewProduct);
router.put('/:id', requireAdminAuth, updateExistingProduct);
router.delete('/:id', requireAdminAuth, removeProduct);

export default router;
