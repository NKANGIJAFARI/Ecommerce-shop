import express from 'express';
const router = express.Router();

import {
	authUser,
	deleteUser,
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

//Route to delete a user by an admin
router.route('/:id').delete(protect, isAdmin, deleteUser);

//Home routes
router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
//router.route('/:id').get(getProductById);

export default router;
