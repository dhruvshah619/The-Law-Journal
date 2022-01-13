const express = require('express');
const Blog = require('../models/blog.js');
const router = new express.Router();

//edit baki

router.post('/blogs',async(req,res)=>{
	//const task = new Task(req.body);
	const blog = new Blog(req.body);
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


router.get('/blogs',async(req,res)=>{

	try{
		let blogs = await Blog.find({});
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


router.get('/blogs/:id',async(req,res)=>{
	const _id = req.params.id;

	try{
		//let task = await Task.findById(_id);

		const blog = await Blog.findOne({_id});
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

router.get('/blogs',async(req,res)=>{
	const _id = req.query.userid;

	try{
		//let task = await Task.findById(_id);

		const blog = await Blog.find({user_id : _id});
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

router.put('/blogs/:id',async(req,res)=>{
	try{
		Blog.findOneAndUpdate({_id:req.params.id}, req.body, function (err, blog) {
			if(!blog){
				return res.status(404).send();
			}
			res.status(200).send();
		});

	}catch(e){
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



router.delete('/blogs/:id',async(req,res)=>{
	try{
		//const task = await Task.findByIdAndDelete(req.params.id);
		const blog = await Blog.findOneAndDelete({_id : req.params.id});
		if(!blog){
			return res.status(404).send();
		}
		res.status(200).send(blog);
	}
	catch(e){
		res.status(500).send(e);
	}
});

module.exports= router;