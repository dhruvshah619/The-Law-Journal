import '../styling/LikedBlogs.css'
import React,{useState, useEffect} from 'react'
import Blog from './Blog.js'
import bg from './../images/background2.png'
function LikedBlogs(props) {
    const [likedBlogs,setLikedBlogs]=useState([]);
    const [arrOfId,setArrOfId]=useState([]);
    const userId = props.id;

    useEffect(() => {
        getLikedBlogs();
    }, []);


    const getLikedBlogs = () => {

        fetch('https://medium-clone-wim.herokuapp.com/likes/user/'+userId)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                console.log('Sorry! Couldn\'t fetch your Liked Blogs');
                return Promise.reject(error);
            }
            setArrOfId(data);
        })
        .catch(error => {
            console.log('Sorry! Couldn\'t fetch your Liked Blogs');
            console.error('There was an error!', error);
        });
      }

    const doNothing= ()=>{
    }

    useEffect(() => {
        arrOfId.length> 0?
        arrOfId.map(ele=>{      
            
                    var blog_id = ele["blog_id"];//got the blog id,now fetch the blog.

                    fetch('https://medium-clone-wim.herokuapp.com/blogs/'+blog_id)
                    .then(async response => {
                        const data = await response.json();
              
                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = (data && data.message) || response.statusText;
                            console.log('Sorry!Couldn\'t fetch all the Liked Blogs!');
                            return Promise.reject(error);
                        }
                        setLikedBlogs(oldArray => [...oldArray,
                            {
                                id:data["_id"],
                                blogPost:data
                            }]);
                    })
                    .catch(error => {
                        console.log('Sorry!Couldn\'t fetch all the Liked Blogs!');
                    });


                   
                })
          :doNothing()
    }, [arrOfId])

    return (
        <div className="likedBlogs">
            {
                likedBlogs.length>0?
                likedBlogs.map(({id,blogPost})=>(
                    <Blog key={id} id={id} blogPost={blogPost} setBlogToOpen={props.settingBlogToOpen} toggleOpenMyProfile={props.toggleOpenMyProfile}
                    toggleOpenBlogViewer={props.settingOpenBlogViewer} setBlogToOpenID={props.settingBlogToOpenID} toggleOpenMyBlogs={props.toggleOpenMyBlogs} toggleOpenLikedBlogs={props.toggleOpenLikedBlogs} toggleOpenHome={props.toggleOpenHome} toggleOpenEditBlog={props.toggleOpenEditBlog}  type='likedBlogs'
                    />
                )):<><img width="500px" height="400px" src={bg} id="sorry"></img><h1 id="sorryMsg">You haven't Liked any Blogs  Yet!</h1></>
            }
        </div>
    )
}

/*
    Get the Liked Ones
    Get blog via blog id and add it to the list
*/

export default LikedBlogs
