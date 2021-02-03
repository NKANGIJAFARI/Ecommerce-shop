import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware';

import {
	getProducts,
	getProductById,
	deleteProduct,
} from '../controllers/productController.js';

router.route('/').get(getProducts);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct);

export default router;
