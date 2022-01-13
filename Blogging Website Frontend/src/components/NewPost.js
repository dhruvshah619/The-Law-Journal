import '../styling/NewPost.css'
import React,{useState} from 'react'
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
function NewPost(props) {

    const [postTitle,setPostTitle]=useState('');
    const [postBlog,setPostBlog]=useState('');
    const [postCategory,setPostCategory]=useState('Show All');
    const [postTags,setPostTags]=useState('#');
    const authorId =props.id;
    const authorName = props.name;
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
    const publishBlog=(e)=>{
        e.preventDefault();    
        //here add to db!
        if(postTitle===''){
            alert('Please provide Title for the Blog');
            return;
        }
        if(postBlog===''){
            alert('Please provide Content for the Blog');
            return;
        }
        if(postCategory==='Show All' || postCategory==='' ){
            alert('Please provide Category for the Blog');
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ title: postTitle,tags:postTags,body_text:postBlog,category:postCategory,user_id:authorId,author_name:authorName})
        };
        fetch('https://medium-clone-wim.herokuapp.com/blogs', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data1 = await response.json();
                const data = isJson && data1;
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    alert('Sorry! Couldn\'t Post the Blog successfully! Please try again!')
                    return Promise.reject(error);
                }
                alert('Blog Posted Successfully!');    
                props.toggleOpen();
            })
            .catch(error => {
                console.log(error)
                alert('Sorry! Couldn\'t Post the Blog successfully! Please try again!')
            });
    }
    const discardBlog=(e)=>{
        e.preventDefault();    
        props.toggleOpen();
    }
    return (        
        <div className="newPost">
            <button id="cancel" onClick={props.toggleOpen}>
                X
            </button>
            <form className="newPostForm">
                <div className="main-info">
                    <input name="postTitle" id="newPostTitle" placeholder="Enter title here.." value={postTitle}
                        onChange={(e)=>{handlePostTitleChange(e)}}
                    ></input>
                    <select name="postCategory" id="newPostCategory" value={postCategory} onChange={(e)=>handlePostCategoryChange(e)}>
                        {
                            categories.map(category=>(
                                <option  key={category} value={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>
                <textarea name="postBlog" id="newPostBlog" placeholder="Enter blog here.." value={postBlog}
                onChange={(e)=>{handlePostBlogChange(e)}}
                ></textarea>
                <input name="postTags" id="newPostTags" placeholder="Add tags here.." value={postTags}
                 onChange={(e)=>{handlePostTagsChange(e)}}></input>
                <div className="button-group">
                        <button name="discard" onClick={(e)=>discardBlog(e)} id="discardBlog">Discard</button>
                        <button name="post" onClick={(e)=>publishBlog(e)} id="publishBlog"
                        >Publish</button>
                </div>
            </form>
        </div>
    )
}

export default NewPost
