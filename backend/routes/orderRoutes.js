import express from 'express';
const router = express.Router();

import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/orders').post(protect, addOrderItems);
//router.route('/:id').get(getProductById);

export default router;
