import '../styling/MyBlogs.css'
import React,{useState, useEffect} from 'react'
import Blog from './Blog.js'
import bg from './../images/background2.png'

function MyBlogs(props) {
    const [arrOfId,setArrOfId]=useState([]);
    const [myBlogs,setMyBlogs]=useState([]);

    const userId = props.id;
    useEffect(() => {
        console.log('CALLED - 0')
        getMyBlogs();
    },[]);
    const doNothing= ()=>{
    }
    const getMyBlogs = async () => {
        console.log('CALLED - 1')
        fetch('https://medium-clone-wim.herokuapp.com/blogs/userid/'+userId)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                alert('Error encountered!');
                return Promise.reject(error);
            }
            setArrOfId(data);
            console.log('CALLED - 2')
        })
        .catch(error => {
            alert('Invalid Username/Password');
            console.error('There was an error!', error);
        });
      }


    useEffect(() => {
        console.log('CALLED - 3')
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
        <div className="myBlogs">
            {
                myBlogs.length>0?
                myBlogs.map(({id,blogPost})=>(
                <Blog key={id} id={id} blogPost={blogPost} setBlogToOpen={props.settingBlogToOpen} toggleOpenMyProfile={props.toggleOpenMyProfile}
                toggleOpenBlogViewer={props.settingOpenBlogViewer} setBlogToOpenID={props.settingBlogToOpenID} toggleOpenMyBlogs={props.toggleOpenMyBlogs} toggleOpenLikedBlogs={props.toggleOpenLikedBlogs} toggleOpenHome={props.toggleOpenHome} toggleOpenEditBlog={props.toggleOpenEditBlog}  type='myBlogs'
                />
                )):<><img width="500px" height="400px" src={bg} id="sorry"></img><h1 id="sorryMsg">You haven't Published any Blogs Yet!</h1></>
            }
        </div>
    )
}

export default MyBlogs
