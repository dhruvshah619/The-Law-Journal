const express = require('express');
require('./src/db/mongoose.js');
const userModel = require("./src/models/user.js");
const userRouter = require('./src/routers/user.js');
const blogRouter = require('./src/routers/blog.js');
const followingRouter = require('./src/routers/following.js');
const likeRouter = require('./src/routers/like.js');
const commentsRouter = require('./src/routers/comment.js');
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(userRouter);
app.use(blogRouter);
app.use(followingRouter);
app.use(likeRouter);
app.use(commentsRouter);

app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});