import express from 'express';
const router = express.Router();

import {
	authUser,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

//Login route
router.post('/login', authUser);

//Profile routes
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

//Home routes
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
//router.route('/:id').get(getProductById);

export default router;
