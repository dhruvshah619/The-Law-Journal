const mongoose = require('mongoose');
const validator = require('validator');

const blogSchema = new mongoose.Schema({
	title : {
		type : String,
		required : true,
		trim : true
	},
	tags : {
		type : String,
		required : true,
		trim : true
	},
	body_text : {
		type : String,
		required : true,
		trim : true
	},
	category : {
		type : String,
		required : true,
		trim : true
	},
	user_id : {
		type : mongoose.Schema.Types.ObjectId,
		required : true,
		ref : 'User'
	},
	author_name : {
		type : String,
		required : true,
		trim : true
	}
},{ timestamps: true });


const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;