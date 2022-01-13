import React,{useState,useEffect} from 'react'
import '../styling/DisplayProfile.css'
import DisplayProfileDetails from './DisplayProfileDetails.js'
import Interaction from './Interaction.js'

function DisplayProfile(props) {
    return (
        <div className = "displayProfile">
            <DisplayProfileDetails username = {props.username} name={props.name} id={props.id} bio={props.bio} anotherUserId = {props.anotherUserId} settingAnotherUserId= {props.settingAnotherUserID}/>
            {/* Fetch Details */}
            <Interaction username={props.username} settingOpenBlogViewer={props.settingOpenBlogViewer} id={props.id} anotherUserId = {props.anotherUserId} settingAnotherUserId= {props.settingAnotherUserID}
          toggleOpenEditBlog={props.toggleOpenEditBlog} settingBlogToOpen={props.settingBlogToOpen} settingBlogToOpenID={props.settingBlogToOpenID} toggleOpenMyBlogs={props.toggleOpenMyBlogs} toggleOpenMyProfile={props.toggleOpenMyProfile}  toggleOpenLikedBlogs={props.toggleOpenLikedBlogs} toggleOpenHome={props.toggleOpenHome}/>
        </div>
    )
}
export default DisplayProfile
