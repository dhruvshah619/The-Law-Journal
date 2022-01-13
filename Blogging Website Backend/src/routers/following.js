const express = require('express');
const Following = require('../models/following.js');
const router = new express.Router();

//edit baki

router.post('/following',async(req,res)=>{
	//const task = new Task(req.body);
	const blog = new Following(req.body);
	try{
		await blog.save();
		res.status(201).send(blog);
	}catch(e){
		res.status(500).send(e);
	}

	// task.save().then((task)=>{
	// 	res.status(201).send(task);
	// }).catch((e)=>{
	// 	res.status(400).send(e);
	// });
});


router.get('/following',async(req,res)=>{

	try{
		let blogs = await Following.find({});
		res.send(blogs);
	}catch(e){
		res.status(500).send(e);
	}
	// Task.find({}).then((tasks)=>{
	// 	res.send(tasks);
	// }).catch((e)=>{
	// 	res.status(500).send(e);
	// });
});


router.get('/following/:id',async(req,res)=>{
	const _id = req.params.id;

	try{
		//let task = await Task.findById(_id);

		const blog = await Following.find({follower : _id});
		if(!blog){
			return res.status(404).send();
		}

		res.send(blog);
	}
	catch(e){
		res.status(500).send(e);
	}

	// Task.findById(_id).then((task)=>{
	// 	if(!task){
	// 		return res.status(404).send();
	// 	}
	// 	res.send(task);
	// }).catch((e)=>{
	// 	res.status(500).send(e);
	// });
});


router.delete('/following',async(req,res)=>{
	var _follower = req.query.follower;
	var _following = req.query.following;
	try{
		//const task = await Task.findByIdAndDelete(req.params.id);
		const f = await Following.findOneAndDelete({follower : _follower,following : _following});
		if(!f){
			return res.status(404).send();
		}
		res.status(200).send();
	}
	catch(e){
		res.status(500).send(e);
	}
});



// router.patch('/tasks/:id',auth,async(req,res)=>{
// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['description','completed'];
// 	const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

// 	if(!isValidOperation){
// 		return res.status(400).send({error : 'Invalid operation'})
// 	}

// 	const _id = req.params.id;
// 	try{
// 		const task = await Task.findOne({_id : req.params.id,owner : req.user._id});
// 		//const task = await Task.findById(_id);
// 		if(!task){
// 			return res.status(404).send();
// 		}
// 		updates.forEach((update)=> task[update] = req.body[update]);
// 		await task.save();

// 		//let task = await Task.findByIdAndUpdate(_id,req.body,{runValidators : true,new : true});
		
// 		res.send(task);
// 	}
// 	catch(e){
// 		res.status(500).send(e);
// 	}
// });



// router.delete('/blogs/:id',async(req,res)=>{
// 	try{
// 		//const task = await Task.findByIdAndDelete(req.params.id);
// 		const blog = await Following.findOneAndDelete({_id : req.params.id});
// 		if(!blog){
// 			return res.status(404).send();
// 		}
// 		res.status(200).send(blog);
// 	}
// 	catch(e){
// 		res.status(500).send(e);
// 	}
// });

module.exports= router;