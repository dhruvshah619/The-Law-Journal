import React,{useState, useEffect} from 'react'
import '../styling/Interaction.css'
import bg from './../images/background2.png'
import MyProfileBlog from './MyProfileBlog';

function Interaction(props) {
    const [arrOfId,setArrOfId]=useState([]);
    const [myBlogs,setMyBlogs]=useState([]);
    const userId = props.anotherUserId;
    useEffect(() => {
        //looping through the collection of username to get all the id of the post
        getMyBlogs();
    }, []);
    const doNothing= ()=>{
    }

    const getMyBlogs = () => {
        fetch('https://medium-clone-wim.herokuapp.com/blogs/userid/'+userId)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Invalid Username/Password');
                return Promise.reject(error);
            }
            setArrOfId(data);
        })
        .catch(error => {
            alert('Invalid Username/Password');
            console.error('There was an error!', error);
        });
      }

      useEffect(() => {
        arrOfId.length> 0?
        arrOfId.map(ele=>{           
                    setMyBlogs(oldArray => [...oldArray,
                    {
                        id:ele["_id"],
                        blogPost:ele
                    }]);
                })
          :doNothing()
    }, [arrOfId])
    return (
        <div className="myInteractions">
            {
                myBlogs.length>0?
                 myBlogs.map(({id,blogPost})=>(
                    <MyProfileBlog key={id} id={id} username = {props.username} blogPost={blogPost} setBlogToOpen={props.settingBlogToOpen} toggleOpenMyProfile={props.toggleOpenMyProfile}  
                    toggleOpenBlogViewer={props.settingOpenBlogViewer} setBlogToOpenID={props.settingBlogToOpenID} toggleOpenMyBlogs={props.toggleOpenMyBlogs} toggleOpenLikedBlogs={props.toggleOpenLikedBlogs}  toggleOpenHome={props.toggleOpenHome} toggleOpenEditBlog={props.toggleOpenEditBlog}  type='myBlogs'
                    />
                )):<><img width="500px" height="400px" src={bg} id="sorry"></img><h1 id="sorryMsg">No Blogs have been Published Yet!</h1></>
            }
        </div>
    )
}

export default Interaction
