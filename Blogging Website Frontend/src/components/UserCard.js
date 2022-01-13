import React from 'react'
import '../styling/UserCard.css';
function UserCard(props) {
    const[userName,setUserName] = useState('');
    const[userBio,setUserBio] = useState('');
    const[userProfilePic,setUserProfilePic] = useState('');
    return (
        <div class= "userCard">
            <div class="card">
                <div class="card-header">
                    <img src={userProfilePic} id="userProfilePic" name="userProfilePic"></img>
                </div>
                <div class="card-body">
                    <h4 id="userName" name="userName">{userName}</h4>
                    <h6 id="userBio" name="userBio">{userBio}</h6>
                </div>
                <div class="card-footer">
                    <button id="follow" name="follow">Follow</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
