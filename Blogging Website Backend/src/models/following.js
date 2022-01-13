const mongoose = require('mongoose');
const validator = require('validator');

const followingSchema = new mongoose.Schema({
	follower : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'User'
	},
	following : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'User'
	}
});


const Following = mongoose.model('Following',followingSchema);

module.exports = Following;