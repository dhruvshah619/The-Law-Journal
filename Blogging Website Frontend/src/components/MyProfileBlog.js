import '../styling/MyProfileBlog.css'
import React from 'react'

function MyProfileBlog(props) {
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
        props.toggleOpenMyProfile(false);
        props.toggleOpenEditBlog(false);
        props.setBlogToOpen(props.blogPost);
        props.setBlogToOpenID(props.id)
    }
    return (
        <div className="myProfileBlogPostHolder card">
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
            <button id="readEntireBlog1" onClick={togglingBlogViewer}>
            Read Entire Blog..</button>    
            </div>
        </div>
    )
}

export default MyProfileBlog