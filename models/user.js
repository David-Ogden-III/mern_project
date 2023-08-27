const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	fname: {
		type: String,
		default: '',
	},
	lname: {
		type: String,
		default: '',
	},
	admin: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('User', userSchema);
