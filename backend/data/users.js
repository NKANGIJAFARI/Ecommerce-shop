import bycrypt from 'bcryptjs';

const users = [
	{
		name: 'Nkangi Jafari',
		email: 'nkangi@gmail.com',
		password: bycrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Zenia Lyyke',
		email: 'zenia@gmail.com',
		password: bycrypt.hashSync('123456', 10),
	},
	{
		name: 'Nakadama Halima',
		email: 'mima@gmail.com',
		password: bycrypt.hashSync('123456', 10),
	},
];

export default users;
