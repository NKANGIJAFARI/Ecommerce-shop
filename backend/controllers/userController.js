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

// @desc    Update user profile
//@Route    Put /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
	//Go to database and check for the user that is to be updated
	const user = await User.findById(req.user._id);

	//If the user exists, do the below
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		//For the password, let0s first check if
		//user entered new one in the form
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);

		throw new Error('User not found');
	}
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
