const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
        role: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		mobileNo: { type: Number, required: true },
		password: { type: String, required: true },
	},
	{ collection: 'user-data' }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;