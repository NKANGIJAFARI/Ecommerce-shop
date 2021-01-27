import express from 'express';
const router = express.Router();

import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//Login route
router.post('/login', authUser);

//Profile routes
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

//Home routes
router.route('/').post(registerUser);
//router.route('/:id').get(getProductById);

export default router;
