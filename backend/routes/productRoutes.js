import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct)
	.put(protect, isAdmin, updateProduct);
router.get('/top', getTopProducts);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
