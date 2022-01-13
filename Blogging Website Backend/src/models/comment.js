const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema({
	
	blog_id : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'Blog'
	},
	name : {
		type : String,
		required : true,
		trim : true
	},
	comment : {
		type : String,
		required : true,
		trim : true
	},
},{ timestamps: true });


const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;