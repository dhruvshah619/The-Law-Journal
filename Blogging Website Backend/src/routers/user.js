const express = require('express');
const User = require('../models/user.js');
const router = new express.Router();

router.post('/users',async (req,res)=>{
	const user = new User(req.body);

	try{
		await user.save();
		res.status(201).send(user);
	}catch(e){
		res.status(400).send(e);
	}
	// user.save().then((user)=>{
	// 	res.status(201).send(user);
	// }).catch((e)=>{
	// 	res.status(400).send(e);
	// });
});

router.get('/users/login',async (req,res)=>{
	try{
		const user = await User.findByCredentials(req.query.email,req.query.password);
		res.send(user);
	}catch(e){
		res.status(400).send();
	}
	

});

router.get('/users',async (req,res)=>{
	try{
		const user = await User.find({});
		res.send(user);
	}catch(e){
		res.status(400).send();
	}
	

});

// router.post('/users/logout',auth,async(req,res)=>{
// 	try{
// 		req.user.tokens = req.user.tokens.filter((token)=>{
// 			return token.token !== req.token;
// 		});
// 		await req.user.save();
// 		res.send();
// 	}catch(e){
// 		res.status(500).send();
// 	}
// });

// router.post('/users/logoutAll',auth,async(req,res)=>{
// 	try{
// 		req.user.tokens = [];
// 		await req.user.save();
// 		res.send();
// 	}catch(e){
// 		res.status(500).send();
// 	}
// });

// router.get('/users/me',async (req,res)=>{

// 	res.send(req.user);
// 	// try{
// 	// 	let users = await User.find({});
// 	// 	res.send(users);
// 	// }catch(e){
// 	// 	res.status(500).send(e);
// 	// }
// 	// User.find({}).then((users)=>{
// 	// 	res.send(users);
// 	// }).catch((e)=>{
// 	// 	res.status(500).send(e);
// 	// });
// });

router.get('/users/:id',async(req,res)=>{

	const _id = req.params.id;

	try{
		let user = await User.findById(_id);
		if(!user){
			return res.status(404).send();
		}
		res.send(user);
	}catch(e){
		res.status(500).send(e);
	}
	// User.findById(_id).then((user)=>{
	// 	if(!user){
	// 		return res.status(404).send();
	// 	}
	// 	res.send(user);
	// }).catch((e)=>{
	// 	res.status(500).send();
	// });
});

router.put('/users/:id',async(req,res)=>{
	try{
		User.findOneAndUpdate({_id:req.params.id}, req.body, function (err, user) {
			if(!user){
				return res.status(404).send();
			}
			res.status(200).send();
		});

	}catch(e){
		res.status(500).send(e);
	}
});

// router.patch('/users/:id',async(req,res)=>{

// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['name','age','password','email'];
// 	const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

// 	if(!isValidOperation){
// 		return res.status(400).send({error : 'Invalid operation'})
// 	}

// 	const _id = req.params.id;
// 	try{

// 		const user = await User.findById(_id);
// 		updates.forEach((update)=> user[update]=req.body[update]);

// 		await user.save();

// 		//const user = await User.findByIdAndUpdate(_id,req.body,{new : true,runValidators : true});
// 		if(!user){
// 			return res.status(404).send();
// 		}
// 		res.send(user);
// 	}
// 	catch(e){
// 		res.status(500).send(e);
// 	}

// });

// router.patch('/users/me',auth,async(req,res)=>{

// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['name','age','password','email'];
// 	const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

// 	if(!isValidOperation){
// 		return res.status(400).send({error : 'Invalid operation'})
// 	}

// 	//const _id = req.params.id;
// 	try{

// 		//const user = await User.findById(req.user_id);
// 		updates.forEach((update)=> req.user[update]=req.body[update]);

// 		await req.user.save();

// 		//const user = await User.findByIdAndUpdate(_id,req.body,{new : true,runValidators : true});
// 		// if(!user){
// 		// 	return res.status(404).send();
// 		// }
// 		res.send(req.user);
// 	}
// 	catch(e){
// 		res.status(500).send(e);
// 	}

// });

// router.delete('/users/:id',async(req,res)=>{
// 	try{
// 		const user = await User.findByIdAndDelete(req.params.id);
// 		if(!user){
// 			return res.status(404).send();
// 		}
// 		res.send(user);
// 	}
// 	catch(e){
// 		res.status(500).send(e);
// 	}
// });

// router.delete('/users/me',async(req,res)=>{
// 	try{
// 		// const user = await User.findByIdAndDelete(req.user._id);
// 		// if(!user){
// 		// 	return res.status(404).send();
// 		// }

// 		await req.user.remove();
// 		res.send(req.user);
// 	}
// 	catch(e){
// 		res.status(500).send(e);
// 	}
// });

module.exports = router;
