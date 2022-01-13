import '../styling/Blog.css'
import React from 'react'

function Blog(props) {
    const username=props.blogPost.author_name;
    const title=props.blogPost.title;
    const blog=props.blogPost.body_text;
    const tags=props.blogPost.tags;
    const category=props.blogPost.category;

    const togglingBlogViewer=()=>{
        props.toggleOpenBlogViewer(true);
        props.toggleOpenMyBlogs(false);
        props.toggleOpenLikedBlogs(false);
        props.toggleOpenHome(false);
        props.toggleOpenEditBlog(false);
        props.setBlogToOpen(props.blogPost);
        props.toggleOpenMyProfile(false);
        props.setBlogToOpenID(props.id)
    }
    const togglingOpenEditBlog=()=>{
        props.toggleOpenEditBlog(true);
        props.setBlogToOpen(props.blogPost);
        props.setBlogToOpenID(props.id)
    }
    return (
        <div className="blogPostHolder card">
            <div className="card-header">
                <h3>{title}</h3 >
                <h5>{username}</h5>
            </div>
            <div className="card-body">
                <p>{blog}</p>
            </div>
            <div className="card-footer">
            <p>{tags}</p>
            <p>Category: {category}</p>
            <button id="readEntireBlog" onClick={togglingBlogViewer}>
            Read Entire Blog..</button>
            {
                props.type==='myBlogs'?
                <button id="editBlog" onClick={togglingOpenEditBlog}
                >Edit Blog</button>:''
            }        
            </div>
        </div>
    )
}

export default Blog