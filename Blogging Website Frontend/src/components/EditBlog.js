import React,{useState,useEffect} from 'react'
import '../styling/EditBlog.css'
import deleteIcon from './../images/delete.png'
import editIcon from './../images/pencil.png'
const categories=[
    'Show All',
    'Bankruptcy',
    'Corporate',
    'Constitutional',
    'Criminal Defence',
    'Employment and Labor',
    'Entertainment',
    'Estate Planning',
    'Family',
    'Immigration',
    'Intellectual Property',
    'Personal Injury',
    'Tax'
];

function EditBlog(props) {
    const username=props.blogPost.author_name;
    const [postTitle,setPostTitle]=useState(props.blogPost.title);
    const [postBlog,setPostBlog]=useState(props.blogPost.body_text);
    const [postCategory,setPostCategory]=useState(props.blogPost.category);
    const [postId,setPostId]=useState(props.id);
    const name = props.name;
    const user_id = props.user_id;
    const [postTags,setPostTags]=useState(props.blogPost.tags);
    const handlePostTitleChange=(e)=>{
        e.preventDefault();    
        setPostTitle(e.target.value);
    }
    const handlePostBlogChange=(e)=>{
        e.preventDefault();    
        setPostBlog(e.target.value);
    }   
    const handlePostCategoryChange=(e)=>{
        e.preventDefault();
        setPostCategory(e.target.value);
    }
    const handlePostTagsChange=(e)=>{
        e.preventDefault();    
        setPostTags(e.target.value);
    }
    const deletePost=(e)=>{
        /*
            1.Remove from posts the with id given
            2.remove from the users one
            3.remove from those who liked
        */
        //here to remove from posts collection

         // DELETE request using fetch with error handling
    fetch('https://medium-clone-wim.herokuapp.com/blogs/'+postId, { method: 'DELETE' })
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            console.log('Sorry,the blog couldn\'t be deleted successfully!');
            return Promise.reject(error);
        }
        alert('Blog Deleted Successfully!');
        //call my blogs here!
    })
    .catch(error => {
        console.log('Sorry,the blog couldn\'t be deleted successfully!');
        console.error('There was an error!', error);
    });
        e.preventDefault();    
        props.toggleOpen(false);
    }
    const saveChanges=(e)=>{
        /*
            Update the changes at the blog id given!
        */
        /*Enable everthing to false */

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: postTitle,tags:postTags,body_text:postBlog,category:postCategory,user_id:user_id,author_name:name})
        };

        console.log("Post ID:"+postId);
        console.log(postTitle+" \n "+postTags+" \n "+postBlog + " \n "+postCategory+ " \n "+user_id+ " \n "+name)
        fetch('https://medium-clone-wim.herokuapp.com/blogs/'+postId, requestOptions)
            .then(async response => {
                console.log("Response 1 ",response);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = response.status;
                    console.log('Sorry!Couldn\'t update the Blog successfully!');
                    return Promise.reject(error);
                }
                alert('Blog Updated Successfully!');
                setPostId(postId);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        
        e.preventDefault(); 
        props.toggleOpenHome(true)
        props.toggleOpen(false);
        
    }
    const discardChanges=(e)=>{
        /*Enable everthing to false */
        e.preventDefault();    
        props.toggleOpen(false);
    }
    const editPost=(e)=>{
        /*Enable everthing to true */
        e.preventDefault(); 
        document.getElementById("newPostTitle").removeAttribute("disabled");
        document.getElementById("newPostCategory").removeAttribute("disabled");
        document.getElementById("newPostBlog").removeAttribute("disabled");
        document.getElementById("newPostTags").removeAttribute("disabled");
    }

    return (
        <div className="newPost">
            <form className="newPostForm">
            <div className="editing-opt">
                <button id="deletePost" onClick={deletePost}>
                    <img src={deleteIcon}></img>
                </button>
                <button id="editPost" onClick={editPost}>
                    <img src={editIcon}></img>
                </button>
            </div>
            <div className="main-info">
                <input name="postTitle" id="newPostTitle" placeholder="Enter title here.." value={postTitle} disabled="true"
                     onChange={(e)=>{handlePostTitleChange(e)}}
                ></input>
                <select name="postCategory" id="newPostCategory" disabled="true" value={postCategory} onChange={(e)=>handlePostCategoryChange(e)}>
                    {
                        categories.map(category=>(
                            <option key={category} value={category}>{category}</option>
                        ))
                    }
                </select>
                </div>
                <textarea name="postBlog" id="newPostBlog" disabled="true" placeholder="Enter blog here.." value={postBlog}
                onChange={(e)=>{handlePostBlogChange(e)}}
                ></textarea>
                <input name="postTags" id="newPostTags" placeholder="Add tags here.." value={postTags}
                 onChange={(e)=>{handlePostTagsChange(e)} } disabled="true"></input>
                 <div className="button-group">
                  <button id="publishBlog" onClick={saveChanges}>Save</button>
                  <button id="discardBlog" onClick={discardChanges}>Discard</button>
                  </div>
            </form>
        </div>
    )
}

export default EditBlog
