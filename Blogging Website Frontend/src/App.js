import './App.css';
import Header from './components/Header.js'
import PostsContainer from './components/PostsContainer.js'
import React,{useState, useEffect} from 'react'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import MyBlogs from './components/MyBlogs.js'
import LikedBlogs from './components/LikedBlogs.js'
import BlogViewer from './components/BlogViewer.js'
import EditBlog from './components/EditBlog.js'
import DisplayProfile from './components/DisplayProfile.js';
function App() {
    const [openLogin,setOpenLogin]=useState(true);
    const [openSignup,setOpenSignup]=useState(false);
    const [username,setUsername]=useState('');
    const [name,setName]=useState('');
    const [bio,setBio]=useState('');
    const [id,setId]=useState('');
    const [joined,setJoined]=useState(false);
    const [openMyBlogs,setOpenMyBlogs]=useState(false);
    const [openLikedBlogs,setOpenLikedBlogs]=useState(false);
    const [openHome,setOpenHome]=useState(true);
    const [openMyProfile,setOpenMyProfile]=useState(false);
    const [openEditBlog,setOpenEditBlog] = useState(false);
    const [openBlogViewer,setOpenBlogViewer]=useState(false);
    const [blogToOpen,setBlogToOpen]=useState(null);
    const [blogToOpenID,setBlogToOpenID]=useState(0);
    const [anotherUserId,setAnotherUserID] = useState('');
  
    const toggleEditBlog=(value)=>{
      setOpenEditBlog(value);
    }

    const settingAnotherUserID=(anotherUserId)=>{
      setAnotherUserID(anotherUserId);   
  }

    const settingOpenBlogViewer=(value)=>{
        setOpenBlogViewer(value);
    }    
    const settingBlogToOpen=(blogToOpen)=>{
        setBlogToOpen(blogToOpen);
        
    }
    const settingBlogToOpenID=(blogToOpenID)=>{
        setBlogToOpenID(blogToOpenID);   
    }

    const settingUsername=(username)=>{
      setUsername(username)
    }

    const settingName=(name)=>{
      setName(name)
    }

    const settingBio=(bio)=>{
      setBio(bio)
    }
    const settingId=(id)=>{
      setId(id)
    }

    const settingJoined=()=>{
      setJoined(!joined)
    }
    const settingOpenMyBlogs=(value)=>{
      setOpenMyBlogs(value)
    }

    const settingOpenMyProfile=(value)=>{
       console.log("Inside of HERE!!!")
      setOpenMyProfile(value)
    }

    const settingOpenLikedBlogs=(value)=>{
      setOpenLikedBlogs(value)
    }
    const settingOpenHome=(value)=>{
      setOpenHome(value)
    }
    useEffect(()=>{
      openLogin?setOpenSignup(false):doNothing();
    },[openLogin])
    useEffect(()=>{
      openSignup?setOpenLogin(false):doNothing();
    },[openSignup])
    const doNothing= ()=>{
    }
    const toggleLogin=(value)=>{
        setOpenLogin(value);
    }
    const toggleSignup=(value)=>{
        setOpenSignup(value);
    }

    const rendering=()=>{
      if(joined){
        if(openBlogViewer){
          return <BlogViewer id={blogToOpenID} blogPost={blogToOpen} userid={id} username={username} name={name} bio={bio}/>
        }
        else if(openEditBlog){
          return <EditBlog id={blogToOpenID} blogPost={blogToOpen} user_id={id} username={username} name={name} bio={bio}  toggleOpenHome={settingOpenHome} toggleOpen={toggleEditBlog}/>
        }
        else if(openMyProfile){
          return <DisplayProfile username={username} name={name} id={id} bio={bio} settingOpenBlogViewer={settingOpenBlogViewer} anotherUserId = {anotherUserId} settingAnotherUserId= {settingAnotherUserID}
          toggleOpenEditBlog={toggleEditBlog} settingBlogToOpen={settingBlogToOpen} settingBlogToOpenID={settingBlogToOpenID} toggleOpenMyBlogs={settingOpenMyBlogs} toggleOpenMyProfile={settingOpenMyProfile}  toggleOpenLikedBlogs={settingOpenLikedBlogs} toggleOpenHome={settingOpenHome}/>;

        }
        else if(openHome){
          return <PostsContainer username={username} id={id} name={name} bio={bio} settingOpenBlogViewer={settingOpenBlogViewer} anotherUserId = {anotherUserId} settingAnotherUserId= {settingAnotherUserID} 
          toggleOpenEditBlog={toggleEditBlog} settingBlogToOpen={settingBlogToOpen} settingBlogToOpenID={settingBlogToOpenID} toggleOpenMyBlogs={settingOpenMyBlogs} toggleOpenLikedBlogs={settingOpenLikedBlogs} toggleOpenMyProfile={settingOpenMyProfile} toggleOpenHome={settingOpenHome}/>;
        }
        else if(openMyBlogs){
          return <MyBlogs username={username} name={name} id={id} bio={bio}  settingOpenBlogViewer={settingOpenBlogViewer} toggleOpenEditBlog={toggleEditBlog} settingBlogToOpen={settingBlogToOpen} toggleOpenMyProfile={settingOpenMyProfile} settingBlogToOpenID={settingBlogToOpenID} toggleOpenMyBlogs={settingOpenMyBlogs} toggleOpenLikedBlogs={settingOpenLikedBlogs} toggleOpenHome={settingOpenHome}/>;
        }else if(openLikedBlogs){
          return <LikedBlogs username={username} name={name} id={id} bio={bio} settingOpenBlogViewer={settingOpenBlogViewer} toggleOpenEditBlog={toggleEditBlog} settingBlogToOpen={settingBlogToOpen} toggleOpenMyProfile={settingOpenMyProfile} settingBlogToOpenID={settingBlogToOpenID} toggleOpenMyBlogs={settingOpenMyBlogs} toggleOpenLikedBlogs={settingOpenLikedBlogs} toggleOpenHome={settingOpenHome}/>;
        }
        else
          return null;
      }
    }
  return (
    <div className="App">
      {joined?<Header username={username} name={name} bio={bio} id={id} anotherUserId = {anotherUserId} settingAnotherUserId= {settingAnotherUserID} loggedIn={joined} settingId={settingId} settingName={settingName} settingBio={settingBio} toggleLogin={toggleLogin} toggleSignup={toggleSignup} settingJoined={settingJoined} settingUsername = {settingUsername} toggleOpenHome={settingOpenHome}
        toggleOpenMyBlogs={settingOpenMyBlogs} toggleOpenMyProfile={settingOpenMyProfile} toggleOpenLikedBlogs={settingOpenLikedBlogs} toggleOpenBlogViewer={settingOpenBlogViewer}
      />:''
      }
      {
        rendering()
      }
      {openLogin?<Login settingUsername={settingUsername} settingId={settingId} settingName={settingName} settingBio={settingBio} toggleLogin={toggleLogin} toggleSignup={toggleSignup} toggleOpenHome={settingOpenHome} settingJoined={settingJoined}/>:''}
      {openSignup?<Signup settingUsername={settingUsername} settingId={settingId} settingName={settingName} settingBio={settingBio} toggleSignup={toggleSignup} toggleLogin={toggleLogin}  toggleOpenHome={settingOpenHome} settingJoined={settingJoined}/>:''}
    </div>
  );
}

export default App;
