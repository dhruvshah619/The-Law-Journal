const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true,
		trim : true
	},
	bio : {
		type : String,
		required : true,
		trim : true
	},
	email : {
		type : String,
		required : true,
		trim : true,
		lowercase : true,
		unique : true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email is invalid');
			}
		}
	},
	password : {
		type : String,
		required : true,
		trim : true,
	}
});


userSchema.statics.findByCredentials = async (email,password)=>{
	const user = await User.findOne({email});

	if(!user){
		throw new Error('Unable to login');
	}

	return user;
}
const User = mongoose.model('User',userSchema);

module.exports = User;