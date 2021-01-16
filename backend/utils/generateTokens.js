import jwt from 'jsonwebtoken';

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
		//That means it will expire in 30days
	});
};

export default generateToken;
