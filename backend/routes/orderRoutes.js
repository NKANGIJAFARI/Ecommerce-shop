import express from 'express';
const router = express.Router();

import {
	addOrderItems,
	getOrderById,
	getOrders,
	getUserOrders,
	updateOrderToPaid,
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToPaid);

export default router;
