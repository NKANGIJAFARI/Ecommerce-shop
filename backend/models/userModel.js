import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

/* Below we are using a method called matchPassword which will compare the
user password in the database to the password entered and give 
back results, we use this password on this User" 
So, in userController we call matchPassword and pass in the password
as an argument so it compares the entered password, with the password that
is linked to the email entered in the req.body
*/

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

/*This is a method the harsh the password whenever the user tries to
create an account or even when they try to change their passwords */

//pre('save) means that this should run before saving a user
userSchema.pre('save', async function (next) {
	/* First check if the password field is modified, if not, next will cancel
	the operations of this all function*/
	if (!this.isModified('password')) {
		next();
	}

	//Encrypt the password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
