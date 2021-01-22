import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateToken from '../utils/generateTokens.js';

// @desc    Auth the uer and get token
//@Route     Get /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
	//Destructure email and password from the body entered
	const { email, password } = req.body;

	//Get the user using the User Model by finding a user with that email entered
	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc   	Create a user
//@Route    Post /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
	//Destructure email and password from the body entered
	const { email, password, name } = req.body;

	//Get the user using the User Model by finding a user with that email entered
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email already taken');
	}

	if (!userExists) {
		try {
			const createdUser = await User.create({
				name,
				email,
				password,
			});

			if (createdUser) {
				res.status(201).json({
					_id: createdUser._id,
					name: createdUser.name,
					email: createdUser.email,
					isAdmin: createdUser.isAdmin,
					token: generateToken(createdUser._id),
				});
			}
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Get user profile
//@Route     Get /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);

		throw new Error('User not found');
	}
});

export { authUser, getUserProfile, registerUser };
