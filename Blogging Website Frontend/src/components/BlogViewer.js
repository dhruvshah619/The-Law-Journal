import React,{useState,useEffect} from 'react'
import '../styling/BlogViewer.css'
import heartImg from './../images/heart.png'
import likeImg from './../images/like.png'
import send from './../images/send.png'
function BlogViewer(props) {
    const loginUsername=props.username;
    const currentUser= props.name;
    const username=props.blogPost.user_id;
    const name = props.blogPost.author_name;
    const title=props.blogPost.title;
    const blog=props.blogPost.body_text;
    const tags=props.blogPost.tags;
    const category=props.blogPost.category;
    const blogId=props.id;
    const id =props.userid;

    const timestamp=props.blogPost.createdAt;
    const arr=timestamp.split("T");
    const date = arr[0].trim();
    
    const [comments,setComments]=useState([]);
    const [like,setLike]=useState(false);
    const [initialLike,setInitialLike]=useState(3);
    const [done,setDone]=useState(false);
    const [likes,setLikes]=useState();
    const [newComment,setNewComment] = useState('');
    const [likesContainer,setLikesContainer] = useState([]);
    const toggleLike=()=>{
        setLike(!like);
    }
    const handleComment=(e)=>{
        setNewComment(e.target.value)
    }
    const postComment= ()=>{
        //Add Comment to the Post here!
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ blog_id: blogId,name:currentUser,comment:newComment})
        };
        fetch('https://medium-clone-wim.herokuapp.com/comments', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data1 = await response.json();
                const data = isJson && data1;
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    alert('Sorry! Couldn\'t Post the Comment successfully! Please try again!')
                    return Promise.reject(error);
                } 
                setComments(oldArray => [...oldArray,data1])
            })
            .catch(error => {
                console.log(error)
                alert('Sorry! Couldn\'t Comment successfully! Please try again!')
            });
        setNewComment('');
    }

    useEffect(() => {
        if(checkingLikeStatus()){

        }else{

        }
    }, [])


    useEffect(() => {
        fetchAllComments();
        getNumberOfLikes();
    }, [])
    

    const checkingLikeStatus = () =>{
        fetch('https://medium-clone-wim.herokuapp.com/likes/blog/'+blogId)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setLikesContainer(data);
            data.map(ele=>{
                if(ele["user_id"] === id){
                    setLike(true);
                    setInitialLike(1);//Liked
                    setDone(true);
                    return true;
                }
            })
            setInitialLike(2);//Not Liked
            setDone(true);
        })
        .catch(error => {
            setDone(true);
            setInitialLike(0);//Error
            console.error('There was an error!', error);
        });
        setDone(true);
        return false;
    }


    const getNumberOfLikes= ()=>{
        fetch('https://medium-clone-wim.herokuapp.com/likes/blog/'+blogId)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setLikes(data.length);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }


    const fetchAllComments= ()=>{
            fetch('https://medium-clone-wim.herokuapp.com/comments/'+blogId)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                setComments(data);
            })
            .catch(error => {
                alert('Sorry!Couldn\'t load the comments successfully!');
                console.error('There was an error!', error);
            });
        }

    useEffect(()=>{
        if(initialLike!==3){
            setInitialLike(0);
        }
    },[initialLike])

    useEffect(() => {
        //add to liked list else remove from the list
       
        if(done && initialLike!==3){
           
            if(initialLike===1 || initialLike===2){
                setInitialLike(0);
                return;
            }else{
                like?setLikes(likes+1): likes>0?setLikes(likes-1):setLikes(0)
                if(like){
                    likeThisBlog();    
                }else{
                    dislikeThisBlog();      
                }
            }
        }

    }, [like])

    const likeThisBlog =  () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({ user_id: id,blog_id:blogId})
        };
        fetch('https://medium-clone-wim.herokuapp.com/likes', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data1 = await response.json();
                const data = isJson && data1;
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }   
            })
            .catch(error => {
                console.log(error)  
            });
    }   

    const dislikeThisBlog = () =>{
        fetch('https://medium-clone-wim.herokuapp.com/likes?userid='+id+"&blogid="+blogId, { method: 'DELETE' })
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
        
    return (
        <div className="blogViewer">
            <div class="blogDetails">
                <h1>{title}</h1>
                <div class="subDetails">
                    <h5>Written by: {name}</h5>
                    <h6>Published on: {date}</h6>
                    <h5>Category : {category}</h5>
                </div>
                <p>{blog}</p>
                <p>{tags}</p>
            </div>
            <button id="likeBtn" onClick={toggleLike} value={like}>
               { like?<img src={likeImg} id="heartImg"></img>:<img src={heartImg} id="heartImg"></img>}
            </button><spam id="noOfLikes">{likes} likes</spam>
            <h4 id="postHead">Post your comments below</h4>
            {
                //fetch all thew comments here   
                comments.map(comment=>(
                    <p>{comment["name"] +':\t'+ comment["comment"]}</p>
                ))
                
            }
            <div class="newComment">
            <input type="text" id="comment" value={newComment} onChange={handleComment} placeholder="Enter your Comment"></input>
            <button id="postComment" onClick={postComment}>
                <img src={send}></img>
            </button>
            </div>
        </div>
    )
}

export default BlogViewer
