import '../styling/Header.css'
import React,{useState} from 'react'

function Header(props) { 
    const toggleOpeningMyBlogs=()=>{
        props.toggleOpenMyBlogs(true);
        props.toggleOpenLikedBlogs(false);
        props.toggleOpenHome(false);
        props.toggleOpenBlogViewer(false);
        props.toggleOpenMyProfile(false);
        props.toggleLogin(false);
    }
    const toggleOpeningLikedBlogs=()=>{
        props.toggleOpenLikedBlogs(true);
        props.toggleOpenHome(false);
        props.toggleOpenMyBlogs(false);
        props.toggleOpenBlogViewer(false);
        props.toggleOpenMyProfile(false);
        props.toggleLogin(false);
    }
    const toggleOpeningHome=()=>{
        props.toggleOpenHome(true);
        props.toggleOpenMyBlogs(false);
        props.toggleOpenLikedBlogs(false);
        props.toggleOpenBlogViewer(false);
        props.toggleOpenMyProfile(false);
        props.toggleLogin(false);
    }
    const toggleOpeningMyProfile=()=>{
        props.settingAnotherUserId(props.id);
        props.toggleOpenHome(false);
        props.toggleOpenMyBlogs(false);
        props.toggleOpenLikedBlogs(false);
        props.toggleOpenBlogViewer(false);
        props.toggleLogin(false);
        props.toggleOpenMyProfile(true);
       
    }
    const logOutFunction = ()=>{
        // Logout function goes in here
        props.settingUsername('');
        props.settingName('');
        props.settingBio('');
        props.settingId('');
        alert('Logged Out Successfully!');
        props.settingJoined();
        props.toggleLogin(true);
        props.toggleOpenMyProfile(false);
        props.toggleOpenHome(false);
        props.toggleOpenMyBlogs(false);
        props.toggleOpenLikedBlogs(false);
        props.toggleOpenBlogViewer(false);
    }
    const togglingChanging = (ele)=>{
        var optionSelected = ele.target.selectedOptions[0].value
        if("Home" === optionSelected){
            toggleOpeningHome();
        }else if("My Profile" === optionSelected){
            toggleOpeningMyProfile();
        }else if("Logout" === optionSelected){
            logOutFunction();
        }
    }

    return (
        <div className="header">
           {!props.loggedIn?
                <div className="join">  
                </div>
                : 
                <div className="user-info">
                        <button id="home" onClick={toggleOpeningHome}>The Law Journal
                            {/* <img src={home}></img> */}
                        </button>
                        <button id="myBlogs" onClick={toggleOpeningMyBlogs}>My blogs
                            {/* <img src={blogs}></img> */}
                        </button>
                        <button id="likedBlogs" onClick={toggleOpeningLikedBlogs}>Liked Blogs
                            {/* <img src={like}></img> */}
                        </button>
                    {/* <h3 id="usernameDisplay">{props.username}</h3> */}
                    <select id="dropDown" onChange={(ele)=>togglingChanging(ele)}>
                        <option value ='Home'>{props.username}</option>
                        <option value ='My Profile'>My Profile</option>
                        <option value ='Logout'>Logout</option>
                    </select>
            </div>
            }  
        </div>
    )
}

export default Header
