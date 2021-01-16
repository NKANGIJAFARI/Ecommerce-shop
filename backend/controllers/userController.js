import asyncHandler from 'express-async-handler';

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

export { authUser };
