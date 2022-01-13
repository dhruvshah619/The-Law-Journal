const mongoose = require('mongoose');
const validator = require('validator');

const likeSchema = new mongoose.Schema({
	
	user_id : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'User'
	},
	blog_id : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'Blog'
	}
});


const Like = mongoose.model('Like',likeSchema);

module.exports = Like;